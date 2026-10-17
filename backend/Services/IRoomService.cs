using RoomReservation.Api.DTOs;
 
namespace RoomReservation.Api.Services;
 
public interface IRoomService
{
    Task<List<RoomDto>> GetAllAsync(RoomFilterDto filter);
    Task<RoomFilterOptionsDto> GetFilterOptionsAsync();
}