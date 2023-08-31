import Head from "next/head";

type PageTitleProps = {
  title?: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  return !title ? null : (
    <Head>
      <title key="title">{title}</title>
    </Head>
  );
};

export { PageTitle };
