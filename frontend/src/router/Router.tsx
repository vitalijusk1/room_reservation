import { Route, Routes, Navigate } from "react-router-dom";
import Rooms from "../pages/Rooms/Rooms";
import Reservations from "../pages/Reservations/Reservations";
import Users from "../pages/Users/Users";
import NotFound from "../pages/NotFound/NotFound";
import { paths } from "./paths";
import Layout from "../layout/Layout";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={paths.rooms()} element={<Rooms />} />
        <Route path={paths.reservations()} element={<Reservations />} />
        <Route path={paths.users()} element={<Users />} />
      </Route>
      <Route path="/" element={<Navigate to={paths.rooms()} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
