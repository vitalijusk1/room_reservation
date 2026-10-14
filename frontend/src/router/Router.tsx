import { Route, Routes } from "react-router-dom";
import Rooms from "../pages/Rooms/Rooms";
import Reservations from "../pages/Reservations/Reservations";
import Users from "../pages/Users/Users";
import { paths } from "./paths";
import Layout from "../layout/Layout";

const Router = () => {
  return (
    <Routes>
      <Route path={paths.rooms()} element={<Layout />}>
        <Route index element={<Rooms />} />
        <Route path={paths.reservations()} element={<Reservations />} />
        <Route path={paths.users()} element={<Users />} />
      </Route>
    </Routes>
  );
};

export default Router;
