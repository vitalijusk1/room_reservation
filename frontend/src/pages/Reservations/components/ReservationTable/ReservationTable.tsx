import { useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { endpoints } from "../../../../api/endpoints";
import { getErrorMessage } from "../../../../api/getErrorMessage";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import type { Reservation } from "./types";

interface ReservationTableProps {
  reservations: Reservation[];
  onActionComplete: () => void;
}

const statusStyles: Record<string, string> = {
  Booked: "bg-indigo-50 text-indigo-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-slate-100 text-slate-500",
};

const formatDateTime = (date: string) =>
  new Date(date).toLocaleString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const ReservationTable = ({ reservations, onActionComplete }: ReservationTableProps) => {
  const [pendingReservationId, setPendingReservationId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async (id: number) => {
    setPendingReservationId(id);
    setError(null);
    try {
      await axiosInstance.post(endpoints.cancelReservation(id));
      onActionComplete();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setPendingReservationId(null);
    }
  };

  const handleEndEarly = async (id: number) => {
    setPendingReservationId(id);
    setError(null);
    try {
      await axiosInstance.post(endpoints.endReservationEarly(id));
      onActionComplete();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setPendingReservationId(null);
    }
  };

  return (
    <div className="space-y-3">
      {error && <ErrorMessage message={error} />}

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
                <td className="px-5 py-4 text-sm">{reservation.roomName}</td>
                <td className="px-5 py-4 text-sm">{reservation.organizerName}</td>
                <td className="px-5 py-4">
                  <p className="text-sm">{formatDateTime(reservation.startDate)}</p>
                  <p className="text-xs text-slate-500">→ {formatDateTime(reservation.endDate)}</p>
                </td>
                <td className="px-5 py-4 text-sm">{reservation.attendeesCount}</td>
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
                      {new Date(reservation.startDate) <= new Date() && (
                        <button
                          type="button"
                          disabled={pendingReservationId === reservation.id}
                          onClick={() => handleEndEarly(reservation.id)}
                          className="rounded px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50 disabled:opacity-50"
                        >
                          End early
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={pendingReservationId === reservation.id}
                        onClick={() => handleCancel(reservation.id)}
                        className="rounded px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
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
    </div>
  );
};

export default ReservationTable;
