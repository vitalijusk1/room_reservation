import { useState } from "react";

const RoomFilters = () => {
  const [floor, setFloor] = useState("All floors");
  const [capacity, setCapacity] = useState("Any capacity");
  const [equipment, setEquipment] = useState("All equipment");
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4  ">
      <div className="grid grid-cols-3 gap-3">
        <select
          value={floor}
          onChange={(event) => setFloor(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none focus:border-indigo-400"
        >
          <option>All floors</option>
          <option>1st floor</option>
          <option>2nd floor</option>
          <option>3rd floor</option>
        </select>
        <select
          value={capacity}
          onChange={(event) => setCapacity(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none focus:border-indigo-400"
        >
          <option>Any capacity</option>
          <option>4+ people</option>
          <option>8+ people</option>
          <option>12+ people</option>
        </select>
        <select
          value={equipment}
          onChange={(event) => setEquipment(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none focus:border-indigo-400"
        >
          <option>All equipment</option>
          <option>Projector</option>
          <option>TV screen</option>
          <option>Video conferencing</option>
          <option>Whiteboard</option>
        </select>
      </div>
    </div>
  );
};

export default RoomFilters;
