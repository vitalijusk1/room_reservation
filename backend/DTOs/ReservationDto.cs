using RoomReservation.Api.Models;
 
namespace RoomReservation.Api.DTOs;
 
public class ReservationDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int RoomId { get; set; }
    public string RoomName { get; set; } = string.Empty;
    public int UserId { get; set; }
    public string OrganizerName { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int AttendeesCount { get; set; }
    public ReservationStatus Status { get; set; }
}