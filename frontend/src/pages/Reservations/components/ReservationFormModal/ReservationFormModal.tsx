import { useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { endpoints } from "../../../../api/endpoints";
import { getErrorMessage } from "../../../../api/getErrorMessage";
import type { Room } from "../../../Rooms/components/RoomGrid/types";
import type { User } from "../../../Users/components/UserTable/types";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { Select } from "../../../../components/Select/Select";
import { DateInput } from "../../../../components/DateInput/DateInput";
import { TextInput } from "../../../../components/TextInput/TextInput";

interface ReservationFormModalProps {
  onClose: () => void;
  onCreated: () => void;
  rooms: Room[];
  users: User[];
}

const ReservationFormModal = ({ onClose, onCreated, rooms, users }: ReservationFormModalProps) => {
  const [title, setTitle] = useState("");
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendeesCount, setAttendeesCount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await axiosInstance.post(endpoints.reservations(), {
        title,
        roomId: Number(roomId),
        userId: Number(userId),
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        attendeesCount: Number(attendeesCount),
      });
      onCreated();
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
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

        {error && (
          <div className="mt-4">
            <ErrorMessage message={error} />
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <TextInput required label="Meeting title" value={title} onChange={setTitle} />
          </div>

          <Select
            required
            label="Room"
            value={roomId}
            onChange={setRoomId}
            placeholder="Select room"
            options={rooms.map((room) => ({ value: room.id, label: room.name }))}
          />

          <Select
            required
            label="Organizer"
            value={userId}
            onChange={setUserId}
            placeholder="Select organizer"
            options={users.map((user) => ({
              value: user.id,
              label: `${user.firstName} ${user.lastName}`,
            }))}
          />

          <DateInput
            required
            label="Start"
            type="datetime-local"
            value={startDate}
            onChange={setStartDate}
          />

          <DateInput
            required
            label="End"
            type="datetime-local"
            value={endDate}
            onChange={setEndDate}
          />

          <TextInput
            required
            label="Attendees"
            type="number"
            min="1"
            value={attendeesCount}
            onChange={setAttendeesCount}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="h-10 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create reservation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationFormModal;
