namespace RoomReservation.Api.Models;

public class Room
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Capacity { get; set; }
    public required string Floor { get; set; }
    public bool HasProjector { get; set; }
    public bool HasTvScreen { get; set; }
    public bool HasVideoConferencing { get; set; }
    public bool HasWhiteboard { get; set; }
    public bool IsActive { get; set; } = true;
    public ICollection<Reservation> Reservations { get; set; } = [];
}