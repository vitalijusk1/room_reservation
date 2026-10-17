import { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { endpoints } from "../../../../api/endpoints";
import type { Room } from "./types";
import { Loader } from "../../../../components/Loader/Loader";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

const RoomGrid = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRooms = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(endpoints.rooms());
        setRooms(response.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : null);
        setLoading(false);
      }
    };
    getRooms();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <p className="text-sm text-slate-600">
        <span className="font-semibold text-slate-900">{rooms.length}</span>{" "}
        rooms found
      </p>

      <div className="mt-3 grid grid-cols-3 gap-5">
        {rooms.map((room) => (
          <article
            key={room.id}
            className="rounded-lg border border-slate-200 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">{room.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{room.id}</p>
              </div>
              <span
                className={`rounded px-2 py-1 text-xs font-medium ${
                  room.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {room.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Floor</p>
                <p className="font-medium">{room.floor}</p>
              </div>
              <div>
                <p className="text-slate-500">Capacity</p>
                <p className="font-medium">{room.capacity} people</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-slate-500">Equipment</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {room.hasProjector && (
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                    Projector
                  </span>
                )}
                {room.hasTvScreen && (
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                    TV Screen
                  </span>
                )}
                {room.hasVideoConferencing && (
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                    Video Conferencing
                  </span>
                )}
                {room.hasWhiteboard && (
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                    Whiteboard
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              <p>
                Bookings: {room.totalReservationsCount} (
                {room.completedReservationsCount} completed,{" "}
                {room.cancelledReservationsCount} cancelled)
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RoomGrid;
