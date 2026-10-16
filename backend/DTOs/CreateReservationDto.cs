namespace RoomReservation.Api.DTOs;
 
public class CreateReservationRequest
{
    public string Title { get; set; } = string.Empty;
    public int RoomId { get; set; }
    public int UserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int AttendeesCount { get; set; }
}