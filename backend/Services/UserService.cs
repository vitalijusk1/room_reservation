using Microsoft.EntityFrameworkCore;
using RoomReservation.Api.Data;
using RoomReservation.Api.DTOs;
using RoomReservation.Api.Models;

namespace RoomReservation.Api.Services;

public class UserService(AppDbContext db) : IUserService
{
    public async Task<List<UserDto>> GetAllAsync()
    {
        return await db.Users
            .Select(u => new UserDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                ActiveReservationsCount = u.Reservations
                    .Count(r => r.Status == ReservationStatus.Booked)
            })
            .ToListAsync();
    }
}