namespace RoomReservation.Api.Models;

public class Reservation
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public int RoomId { get; set; }
    public int UserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int AttendeesCount { get; set; }
    public ReservationStatus Status { get; set; } = ReservationStatus.Booked;

    public Room Room { get; set; } = null!;
    public User User { get; set; } = null!;
}
