namespace RoomReservation.Api.DTOs;

public class ReservationFilterOptionsDto
{
    public List<ReservationRoomOptionDto> Rooms { get; set; } = new();
    public List<ReservationOrganizerOptionDto> Organizers { get; set; } = new();
}

public class ReservationRoomOptionDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class ReservationOrganizerOptionDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
