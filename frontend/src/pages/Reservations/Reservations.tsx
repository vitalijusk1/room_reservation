import { useMemo, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import ReservationFilters from "./components/ReservationFilters/ReservationFilters";
import ReservationTable from "./components/ReservationTable/ReservationTable";
import ReservationFormModal from "./components/ReservationFormModal/ReservationFormModal";

const reservations = [
  {
    id: "RES-1048",
    title: "Product weekly sync",
    room: "Aurora",
    organizer: "Maya Keller",
    date: "Oct 14, 2026",
    start: "09:00",
    end: "10:00",
    attendees: 8,
    status: "Booked",
  },
  {
    id: "RES-1049",
    title: "Client discovery call",
    room: "Horizon",
    organizer: "Samuel Jones",
    date: "Oct 14, 2026",
    start: "11:30",
    end: "12:15",
    attendees: 12,
    status: "Booked",
  },
  {
    id: "RES-1050",
    title: "Design review",
    room: "Maple",
    organizer: "Amelia Reed",
    date: "Oct 14, 2026",
    start: "14:00",
    end: "15:30",
    attendees: 5,
    status: "Booked",
  },
  {
    id: "RES-1045",
    title: "Quarterly planning",
    room: "Summit",
    organizer: "Noah Williams",
    date: "Oct 13, 2026",
    start: "13:00",
    end: "16:00",
    attendees: 18,
    status: "Completed",
  },
  {
    id: "RES-1042",
    title: "Marketing brainstorm",
    room: "Orchid",
    organizer: "Elena Martinez",
    date: "Oct 12, 2026",
    start: "10:00",
    end: "11:00",
    attendees: 4,
    status: "Cancelled",
  },
];

const Reservations = () => {
  const [status, setStatus] = useState("All statuses");
  const [showForm, setShowForm] = useState(false);
  const filtered = useMemo(
    () =>
      reservations.filter(
        (reservation) =>
          status === "All statuses" || reservation.status === status,
      ),
    [status],
  );

  return (
    <section className="mx-auto w-full max-w-[1440px] space-y-6 px-8 py-9">
      <PageHeader
        title="Reservations"
        description="Create and manage room reservations."
        btnText="+ New reservation"
        btnAction={() => setShowForm(true)}
      />

      <ReservationFilters status={status} onStatusChange={setStatus} />

      <ReservationTable reservations={filtered} />

      {showForm && <ReservationFormModal onClose={() => setShowForm(false)} />}
    </section>
  );
};

export default Reservations;
