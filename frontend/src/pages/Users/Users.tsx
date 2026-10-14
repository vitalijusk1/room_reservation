import PageHeader from "../../components/PageHeader/PageHeader";
import UserTable from "./components/UserTable/UserTable";

const Users = () => {
  return (
    <section className="mx-auto w-full max-w-[1440px] space-y-6 px-8 py-9">
      <PageHeader
        title="Users"
        description="View users and their active reservations."
      />
      <UserTable />
    </section>
  );
};

export default Users;
