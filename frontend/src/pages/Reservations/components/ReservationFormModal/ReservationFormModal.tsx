import type { FormEvent, MouseEvent } from "react";
import type { Room } from "../../../Rooms/components/RoomGrid/types";
import type { User } from "../../../Users/components/UserTable/types";

interface ReservationFormModalProps {
  onClose: () => void;
  rooms: Room[];
  users: User[];
}

const ReservationFormModal = ({ onClose, rooms, users }: ReservationFormModalProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  const handleModalClick = (event: MouseEvent<HTMLFormElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40"
      onMouseDown={onClose}
    >
      <form
        className="w-full max-w-xl rounded-lg bg-white p-6"
        onMouseDown={handleModalClick}
        onSubmit={handleSubmit}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">New reservation</h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter the meeting details.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-slate-100 px-3 py-2 text-slate-600"
          >
            ×
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <label className="col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-600">
              Meeting title
            </span>
            <input
              required
              className="h-11 w-full rounded-lg border border-slate-200 px-3"
            />
          </label>

          <label>
            <span className="mb-1 block text-sm font-medium text-slate-600">
              Room
            </span>
            <select
              required
              className="h-11 w-full rounded-lg border border-slate-200 px-3"
            >
              <option value="">Select room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1 block text-sm font-medium text-slate-600">
              Organizer
            </span>
            <select
              required
              className="h-11 w-full rounded-lg border border-slate-200 px-3"
            >
              <option value="">Select organizer</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1 block text-sm font-medium text-slate-600">
              Start
            </span>
            <input
              required
              type="datetime-local"
              className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm"
            />
          </label>

          <label>
            <span className="mb-1 block text-sm font-medium text-slate-600">
              End
            </span>
            <input
              required
              type="datetime-local"
              className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm"
            />
          </label>

          <label>
            <span className="mb-1 block text-sm font-medium text-slate-600">
              Attendees
            </span>
            <input
              required
              type="number"
              min="1"
              className="h-11 w-full rounded-lg border border-slate-200 px-3"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600"
          >
            Cancel
          </button>
          <button className="h-10 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white hover:bg-indigo-700">
            Create reservation
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationFormModal;
