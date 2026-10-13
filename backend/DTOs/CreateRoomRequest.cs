using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Api.DTOs;

public class CreateRoomRequest
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Range(1, 1000)]
    public int Capacity { get; set; }
}
