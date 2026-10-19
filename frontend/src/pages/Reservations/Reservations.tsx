import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import ReservationFilters from "./components/ReservationFilters/ReservationFilters";
import ReservationTable from "./components/ReservationTable/ReservationTable";
import ReservationFormModal from "./components/ReservationFormModal/ReservationFormModal";
import axiosInstance from "../../api/axiosInstance";
import { endpoints } from "../../api/endpoints";
import { getErrorMessage } from "../../api/getErrorMessage";
import type { Reservation } from "./components/ReservationTable/types";
import type { ReservationFilterOptions } from "./components/ReservationFilters/types";
import type { Room } from "../Rooms/components/RoomGrid/types";
import type { User } from "../Users/components/UserTable/types";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const Reservations = () => {
  const [searchParams] = useSearchParams();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filterOptions, setFilterOptions] = useState<ReservationFilterOptions | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingFilterOptions, setLoadingFilterOptions] = useState<boolean>(true);
  const [loadingRoomsAndUsers, setLoadingRoomsAndUsers] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoadingFilterOptions(true);
      try {
        const response = await axiosInstance.get(endpoints.reservationFilterOptions());
        setFilterOptions(response.data);
        setLoadingFilterOptions(false);
      } catch (err) {
        setError(getErrorMessage(err));
        setLoadingFilterOptions(false);
      }
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchRoomsAndUsers = async () => {
      setLoadingRoomsAndUsers(true);
      try {
        const [roomsRes, usersRes] = await Promise.all([
          axiosInstance.get(endpoints.rooms()),
          axiosInstance.get(endpoints.users()),
        ]);
        setRooms(roomsRes.data);
        setUsers(usersRes.data);
        setLoadingRoomsAndUsers(false);
      } catch (err) {
        setError(getErrorMessage(err));
        setLoadingRoomsAndUsers(false);
      }
    };
    fetchRoomsAndUsers();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(endpoints.reservations(), {
        params: searchParams,
      });
      setReservations(response.data);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(getErrorMessage(err));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [searchParams]);

  if (loading || loadingFilterOptions || loadingRoomsAndUsers) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!filterOptions) return null;

  return (
    <section className="mx-auto w-full max-w-[1440px] space-y-6 px-8 py-9">
      <PageHeader
        title="Reservations"
        description="Create and manage room reservations."
        btnText="+ New reservation"
        btnAction={() => setShowForm(true)}
      />

      <ReservationFilters filterOptions={filterOptions} />

      <ReservationTable reservations={reservations} onActionComplete={fetchReservations} />

      {showForm && (
        <ReservationFormModal
          onClose={() => setShowForm(false)}
          onCreated={fetchReservations}
          rooms={rooms}
          users={users}
        />
      )}
    </section>
  );
};

export default Reservations;
