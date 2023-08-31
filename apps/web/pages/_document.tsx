import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import {
  COLOR_MODE_KEY,
  COLOR_MODE_DARK,
  COLOR_MODE_LIGHT,
} from "ui/styles/color";

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <script
          id="color-mode"
          dangerouslySetInnerHTML={{
            __html: `((d)=>{try{var p=localStorage.getItem('${COLOR_MODE_KEY}');if(p==d||(p!='${COLOR_MODE_LIGHT}'&&matchMedia('(prefers-color-scheme:dark)').matches)) document.documentElement.classList.add(d)}catch(e){}})('${COLOR_MODE_DARK}')`,
          }}
        />
        <Main />
        <NextScript />
        <Script strategy="beforeInteractive" src="/__ENV.js" />
      </body>
    </Html>
  );
};

export default Document;
