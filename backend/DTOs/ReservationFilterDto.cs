using RoomReservation.Api.Models;
 
namespace RoomReservation.Api.DTOs;
 
public class ReservationFilterDto
{
    public int? RoomId { get; set; }
    public int? UserId { get; set; }
    public ReservationStatus? Status { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}