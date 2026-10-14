export interface Reservation {
  id: string;
  title: string;
  room: string;
  organizer: string;
  date: string;
  start: string;
  end: string;
  attendees: number;
  status: string;
}

interface ReservationTableProps {
  reservations: Reservation[];
}

const statusStyles: Record<string, string> = {
  Booked: "bg-indigo-50 text-indigo-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-slate-100 text-slate-500",
};

const ReservationTable = ({ reservations }: ReservationTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-xs text-slate-500">
          <tr>
            <th className="px-5 py-3 font-semibold">Meeting</th>
            <th className="px-5 py-3 font-semibold">Room</th>
            <th className="px-5 py-3 font-semibold">Organizer</th>
            <th className="px-5 py-3 font-semibold">Date & time</th>
            <th className="px-5 py-3 font-semibold">Attendees</th>
            <th className="px-5 py-3 font-semibold">Status</th>
            <th className="px-5 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="px-5 py-4">
                <p className="text-sm font-semibold">{reservation.title}</p>
                <p className="mt-1 text-xs text-slate-500">{reservation.id}</p>
              </td>
              <td className="px-5 py-4 text-sm">{reservation.room}</td>
              <td className="px-5 py-4 text-sm">{reservation.organizer}</td>
              <td className="px-5 py-4">
                <p className="text-sm">{reservation.date}</p>
                <p className="text-xs text-slate-500">
                  {reservation.start} – {reservation.end}
                </p>
              </td>
              <td className="px-5 py-4 text-sm">{reservation.attendees}</td>
              <td className="px-5 py-4">
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${statusStyles[reservation.status]}`}
                >
                  {reservation.status}
                </span>
              </td>
              <td className="px-5 py-4">
                {reservation.status === "Booked" && (
                  <div className="flex justify-end gap-2">
                    <button className="rounded px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50">
                      End early
                    </button>
                    <button className="rounded px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50">
                      Cancel
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
