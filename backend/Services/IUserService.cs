using RoomReservation.Api.DTOs;

namespace RoomReservation.Api.Services;

public interface IUserService
{
    Task<List<UserDto>> GetAllAsync();
}