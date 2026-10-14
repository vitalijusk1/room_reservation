import { rooms } from "./data";

const RoomGrid = () => {
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
                className={`rounded px-2 py-1 text-xs font-medium ${room.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}
              >
                {room.active ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Location</p>
                <p className="font-medium">
                  Floor {room.floor}, {room.location}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Capacity</p>
                <p className="font-medium">{room.capacity} people</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-slate-500">Equipment</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {room.equipment.map((item) => (
                  <span
                    key={item}
                    className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RoomGrid;
