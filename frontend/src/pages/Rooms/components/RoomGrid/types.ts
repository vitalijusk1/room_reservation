export interface Room {
  id: number;
  name: string;
  capacity: number;
  floor: string;
  hasProjector: boolean;
  hasTvScreen: boolean;
  hasVideoConferencing: boolean;
  hasWhiteboard: boolean;
  isActive: boolean;
  totalReservationsCount: number;
  completedReservationsCount: number;
  cancelledReservationsCount: number;
}
