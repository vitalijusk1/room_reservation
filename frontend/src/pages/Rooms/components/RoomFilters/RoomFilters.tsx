import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../../../api/axiosInstance";
import { endpoints } from "../../../../api/endpoints";
import type { RoomFilterOptions } from "./types";
import { EQUIPMENT_OPTIONS } from "./types";
import { Loader } from "../../../../components/Loader/Loader";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

const RoomFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOptions, setFilterOptions] = useState<RoomFilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedFloors = searchParams.getAll("floor");
  const capacity = searchParams.get("minCapacity") || "";

  useEffect(() => {
    const getFilterOptions = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(endpoints.roomFilterOptions());
        setFilterOptions(response.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : null);
        setLoading(false);
      }
    };
    getFilterOptions();
  }, []);

  const toggleFloor = (floor: string) => {
    const selectedFloors = searchParams.getAll("floor");
    const params = new URLSearchParams(searchParams);

    params.delete("floor");
    selectedFloors
      .filter((selectedFloor) => selectedFloor !== floor)
      .forEach((selectedFloor) => params.append("floor", selectedFloor));

    if (!selectedFloors.includes(floor)) params.append("floor", floor);
    setSearchParams(params);
  };

  const toggleEquipment = (fieldName: string) => {
    const params = new URLSearchParams(searchParams);

    if (params.get(fieldName) === "true") params.delete(fieldName);
    else params.set(fieldName, "true");

    setSearchParams(params);
  };

  const handleCapacityChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("minCapacity", value);
    else params.delete("minCapacity");
    setSearchParams(params);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!filterOptions) return null;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
      <div className="grid grid-cols-3 gap-6">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">Floor</p>
          <div className="flex flex-wrap gap-3">
            {filterOptions.floors.map((f) => (
              <label key={f} className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={selectedFloors.includes(f)}
                  onChange={() => toggleFloor(f)}
                />
                Floor {f}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">Minimum capacity</p>
          <select
            value={capacity}
            onChange={(event) => handleCapacityChange(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none focus:border-indigo-400"
          >
            <option value="">Any capacity</option>
            {Array.from({ length: Math.ceil(filterOptions.maxCapacity / 4) }, (_, i) => (i + 1) * 4).map((cap) => (
              <option key={cap} value={cap}>
                {cap}+ people
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">Equipment</p>
          <div className="flex flex-wrap gap-3">
            {EQUIPMENT_OPTIONS.map((eq) => (
              <label key={eq.fieldName} className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={searchParams.get(eq.fieldName) === "true"}
                  onChange={() => toggleEquipment(eq.fieldName)}
                />
                {eq.display}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomFilters;
