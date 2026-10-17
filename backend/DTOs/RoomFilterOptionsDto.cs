namespace RoomReservation.Api.DTOs;

public class RoomFilterOptionsDto
{
    public List<string> Floors { get; set; } = new();
    public int MaxCapacity { get; set; }
}
