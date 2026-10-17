export interface EquipmentOption {
  display: string;
  fieldName: string;
}

export interface RoomFilterOptions {
  floors: string[];
  capacities: number[];
}

export const EQUIPMENT_OPTIONS: EquipmentOption[] = [
  { display: "Projector", fieldName: "hasProjector" },
  { display: "TV Screen", fieldName: "hasTvScreen" },
  { display: "Video Conferencing", fieldName: "hasVideoConferencing" },
  { display: "Whiteboard", fieldName: "hasWhiteboard" },
];
