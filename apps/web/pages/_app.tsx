import { Suspense, useCallback } from "react";
import { LoadScriptProps } from "@react-google-maps/api";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import env from "@beam-australia/react-env";
import { Auth0Provider, AppState } from "@auth0/auth0-react";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Loading } from "ui/components/Loading";
import { Button } from "ui/components/Button";
import { Box } from "ui/components/Box";
import { ToastProvider } from "ui/components/Toast";
import { useEffectOnce } from "ui/hooks/useEffectOnce";
import { ColorModeProvider } from "components/ColorMode";
import { GoogleMapsProvider } from "components/GoogleMapsProvider";
import { isAuth0Error } from "hooks/useRequest";
import { Modal } from "ui/components/Modal";
import "i18n/config";
import "ui/styles/global.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: 0,
      // Can also be a function for more granular error handling
      // E.g. `(error) => error.response?.status >= 500`
      useErrorBoundary: true,
    },
  },
});

const GOOGLE_MAPS_API_KEY = env("GOOGLE_API_KEY");
const LIBRARIES: LoadScriptProps["libraries"] = ["places"];

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { replace, asPath, locale } = useRouter();
  const { i18n } = useTranslation();

  const onRedirectCallback = useCallback((appState?: AppState) => {
    replace(appState?.returnTo || "/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Checks local storage once on app refresh and redirects to appropriate language
  useEffectOnce(() => {
    const lang = localStorage.getItem("lang") || undefined;

    if (locale !== lang) {
      i18n.changeLanguage(lang);
      replace(asPath, undefined, { locale: lang ?? locale });
    }
  });

  const { t } = useTranslation("home");

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
          key="viewport"
        />
      </Head>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => {
              // AuthO errors are handled in the `useRequest` hook.
              // When encountered user is automatically signed out.
              // Show loading during redirect
              if (isAuth0Error(error)) {
                return <Loading show size="lg" />;
              }

              return (
                <Modal
                  maxWidth={380}
                  open={true}
                  preventOutsideClose
                  title={t("ErrorModalTitle")}
                  hideCloseButton={true}
                  justifyTitle={"center"}
                >
                  <Box as="p" style={{ textAlign: "center" }}>
                    {t("ErrorModalText")}
                  </Box>
                  <Box mb="2.5x">
                    <Box color="background">
                      <Button full onClick={() => resetErrorBoundary()}>
                        {t("ErrorModalTryAgain")}
                      </Button>
                    </Box>
                  </Box>
                  <Box as="a" color="background" href="tel:+18444277772">
                    <Button full priority={2}>
                      {t("ErrorModalCall")}
                    </Button>
                  </Box>
                </Modal>
              );
            }}
            onReset={reset}
          >
            <Suspense fallback={<Loading show size="lg" />}>
              <Auth0Provider
                authorizationParams={{
                  redirect_uri: env("AUTH0_REDIRECT_URI"),
                  audience: env("AUTH0_AUDIENCE"),
                }}
                cacheLocation="localstorage"
                clientId={env("AUTH0_CLIENT_ID")}
                domain={env("AUTH0_DOMAIN")}
                onRedirectCallback={onRedirectCallback}
                useRefreshTokens
              >
                <QueryClientProvider client={queryClient}>
                  <GoogleMapsProvider
                    googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                    language="en"
                    libraries={LIBRARIES}
                  >
                    <ColorModeProvider>
                      <ToastProvider>
                        {getLayout(<Component {...pageProps} />)}
                      </ToastProvider>
                    </ColorModeProvider>
                  </GoogleMapsProvider>
                  <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
              </Auth0Provider>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
};

export default App;
