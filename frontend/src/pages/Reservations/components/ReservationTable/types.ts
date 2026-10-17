export interface Reservation {
  id: number;
  title: string;
  roomId: number;
  roomName: string;
  userId: number;
  organizerName: string;
  startDate: string;
  endDate: string;
  attendeesCount: number;
  status: "Booked" | "Completed" | "Cancelled";
}
