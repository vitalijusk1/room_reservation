interface ReservationFiltersProps {
  status: string;
  onStatusChange: (status: string) => void;
}

const ReservationFilters = ({
  status,
  onStatusChange,
}: ReservationFiltersProps) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="grid grid-cols-4 gap-3">
        <select className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
          <option>All rooms</option>
          <option>Aurora</option>
          <option>Horizon</option>
          <option>Maple</option>
          <option>Summit</option>
          <option>Orchid</option>
        </select>

        <select className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
          <option>All organizers</option>
          <option>Maya Keller</option>
          <option>Samuel Jones</option>
          <option>Amelia Reed</option>
          <option>Noah Williams</option>
          <option>Elena Martinez</option>
        </select>

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600"
        >
          <option>All statuses</option>
          <option>Booked</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <button className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-4 text-left text-sm text-slate-600">
          Date range
        </button>
      </div>
    </div>
  );
};

export default ReservationFilters;
