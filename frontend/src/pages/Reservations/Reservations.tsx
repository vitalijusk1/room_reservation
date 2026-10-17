import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import ReservationTable from "./components/ReservationTable/ReservationTable";
import ReservationFormModal from "./components/ReservationFormModal/ReservationFormModal";
import axiosInstance from "../../api/axiosInstance";
import { endpoints } from "../../api/endpoints";
import type { Reservation } from "./components/ReservationTable/types";
import type { Room } from "../Rooms/components/RoomGrid/types";
import type { User } from "../Users/components/UserTable/types";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [reservationsRes, roomsRes, usersRes] = await Promise.all([
          axiosInstance.get(endpoints.reservations()),
          axiosInstance.get(endpoints.rooms()),
          axiosInstance.get(endpoints.users()),
        ]);
        setReservations(reservationsRes.data);
        setRooms(roomsRes.data);
        setUsers(usersRes.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : null);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="mx-auto w-full max-w-[1440px] space-y-6 px-8 py-9">
      <PageHeader
        title="Reservations"
        description="Create and manage room reservations."
        btnText="+ New reservation"
        btnAction={() => setShowForm(true)}
      />

      <ReservationTable reservations={reservations} />

      {showForm && (
        <ReservationFormModal
          onClose={() => setShowForm(false)}
          rooms={rooms}
          users={users}
        />
      )}
    </section>
  );
};

export default Reservations;
