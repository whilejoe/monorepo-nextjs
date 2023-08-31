import { NextPageWithLayout } from "./_app";
import { PageTitle } from "components/PageTitle";
import { AuthedRestrictedLayout } from "components/AuthedRestrictedLayout";
import { ScheduleLiveMap } from "components/ScheduleLiveMap";

const Home: NextPageWithLayout = () => {
  return <ScheduleLiveMap />;
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthedRestrictedLayout fullMain>
      <PageTitle title="Schedule" />
      {page}
    </AuthedRestrictedLayout>
  );
};

export default Home;
