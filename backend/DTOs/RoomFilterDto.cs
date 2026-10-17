namespace RoomReservation.Api.DTOs;

public class RoomFilterDto
{
    public int? MinCapacity { get; set; }
    public List<string>? Floor { get; set; }
    public bool? HasProjector { get; set; }
    public bool? HasTvScreen { get; set; }
    public bool? HasVideoConferencing { get; set; }
    public bool? HasWhiteboard { get; set; }
}