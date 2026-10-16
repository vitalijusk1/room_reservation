namespace RoomReservation.Api.Models;

public class User
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public ICollection<Reservation> Reservations { get; set; } = [];
}