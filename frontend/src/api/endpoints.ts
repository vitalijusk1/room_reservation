export const endpoints = {
  users: () => "/users",
  rooms: () => "/rooms",
  roomFilterOptions: () => "/rooms/filter-options",
  reservations: () => "/reservations",
  reservationFilterOptions: () => "/reservations/filter-options",
  cancelReservation: (id: number) => `/reservations/${id}/cancel`,
  endReservationEarly: (id: number) => `/reservations/${id}/end-early`,
};