namespace RoomReservation.Api.DTOs;
 
public class RoomDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public string Floor { get; set; } = string.Empty;
    public bool HasProjector { get; set; }
    public bool HasTvScreen { get; set; }
    public bool HasVideoConferencing { get; set; }
    public bool HasWhiteboard { get; set; }
    public bool IsActive { get; set; }
    public int TotalReservationsCount { get; set; }
    public int CompletedReservationsCount { get; set; }
    public int CancelledReservationsCount { get; set; }
}