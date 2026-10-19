import { useSearchParams } from "react-router-dom";
import type { RoomFilterOptions } from "./types";
import { EQUIPMENT_OPTIONS } from "./types";
import { CheckboxGroup } from "../../../../components/CheckboxGroup/CheckboxGroup";
import { Select } from "../../../../components/Select/Select";

interface RoomFiltersProps {
  filterOptions: RoomFilterOptions;
}

const RoomFilters = ({ filterOptions }: RoomFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedFloors = searchParams.getAll("floor");
  const capacity = searchParams.get("minCapacity") || "";
  const selectedEquipment = EQUIPMENT_OPTIONS.filter(
    (eq) => searchParams.get(eq.fieldName) === "true",
  ).map((eq) => eq.fieldName);

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

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
      <div className="grid grid-cols-3 gap-6">
        <CheckboxGroup
          label="Floor"
          options={filterOptions.floors.map((f) => ({ value: f, label: `Floor ${f}` }))}
          selectedValues={selectedFloors}
          onToggle={toggleFloor}
        />

        <Select
          label="Minimum capacity"
          value={capacity}
          onChange={handleCapacityChange}
          placeholder="Any capacity"
          options={filterOptions.capacities.map((c) => ({ value: c, label: `${c}+ people` }))}
        />

        <CheckboxGroup
          label="Equipment"
          options={EQUIPMENT_OPTIONS.map((eq) => ({ value: eq.fieldName, label: eq.display }))}
          selectedValues={selectedEquipment}
          onToggle={toggleEquipment}
        />
      </div>
    </div>
  );
};

export default RoomFilters;
