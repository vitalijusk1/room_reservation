export interface ReservationRoomOption {
  id: number;
  name: string;
}

export interface ReservationOrganizerOption {
  id: number;
  name: string;
}

export interface ReservationFilterOptions {
  rooms: ReservationRoomOption[];
  organizers: ReservationOrganizerOption[];
}
