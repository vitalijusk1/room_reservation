using RoomReservation.Api.DTOs;

namespace RoomReservation.Api.Services;

public interface IRoomService
{
    Task<List<RoomDto>> GetAllAsync();
    Task<RoomDto?> GetByIdAsync(int id);
    Task<RoomDto> CreateAsync(CreateRoomRequest request);
}
