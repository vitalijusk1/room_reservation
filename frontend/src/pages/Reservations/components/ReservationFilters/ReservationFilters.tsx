import { useSearchParams } from "react-router-dom";
import type { ReservationFilterOptions } from "./types";
import { Select } from "../../../../components/Select/Select";
import { DateInput } from "../../../../components/DateInput/DateInput";

interface ReservationFiltersProps {
  filterOptions: ReservationFilterOptions;
}

const STATUS_OPTIONS = ["Booked", "Completed", "Cancelled"];

const ReservationFilters = ({ filterOptions }: ReservationFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const roomId = searchParams.get("roomId") || "";
  const userId = searchParams.get("userId") || "";
  const status = searchParams.get("status") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  const handleChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="grid grid-cols-5 gap-3">
        <Select
          value={roomId}
          onChange={(value) => handleChange("roomId", value)}
          placeholder="All rooms"
          options={filterOptions.rooms.map((room) => ({ value: room.id, label: room.name }))}
        />

        <Select
          value={userId}
          onChange={(value) => handleChange("userId", value)}
          placeholder="All organizers"
          options={filterOptions.organizers.map((organizer) => ({
            value: organizer.id,
            label: organizer.name,
          }))}
        />

        <Select
          value={status}
          onChange={(value) => handleChange("status", value)}
          placeholder="All statuses"
          options={STATUS_OPTIONS.map((option) => ({ value: option, label: option }))}
        />

        <DateInput
          type="datetime-local"
          value={startDate}
          onChange={(value) => handleChange("startDate", value)}
        />

        <DateInput
          type="datetime-local"
          value={endDate}
          onChange={(value) => handleChange("endDate", value)}
        />
      </div>
    </div>
  );
};

export default ReservationFilters;
