using RoomReservation.Api.DTOs;
 
namespace RoomReservation.Api.Services;
 
public interface IReservationService
{
    Task<List<ReservationDto>> GetAllAsync(ReservationFilterDto filter);
    Task<ReservationFilterOptionsDto> GetFilterOptionsAsync();
    Task<ReservationDto> CreateAsync(CreateReservationRequest request);
    Task CancelAsync(int id);
    Task EndEarlyAsync(int id);
}