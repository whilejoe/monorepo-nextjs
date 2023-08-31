import { NextPageWithLayout } from "../_app";
import { PageTitle } from "components/PageTitle";
import { AuthedAdminLayout } from "components/AuthedAdminLayout";
import { Dashboard } from "components/Dashboard";

const AdminHome: NextPageWithLayout = () => {
  return <Dashboard />;
};

AdminHome.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthedAdminLayout>
      <PageTitle title="Dashboard" />
      {page}
    </AuthedAdminLayout>
  );
};

export default AdminHome;
