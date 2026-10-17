namespace RoomReservation.Api.DTOs;

public class RoomFilterOptionsDto
{
    public List<string> Floors { get; set; } = new();
    public List<int> Capacities { get; set; } = new();
}
