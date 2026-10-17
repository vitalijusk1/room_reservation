using Microsoft.EntityFrameworkCore;
using RoomReservation.Api.Data;
using RoomReservation.Api.DTOs;
using RoomReservation.Api.Models;
 
namespace RoomReservation.Api.Services;
 
public class RoomService(AppDbContext db) : IRoomService
{
    public async Task<List<RoomDto>> GetAllAsync(RoomFilterDto filter)
    {
        var query = db.Rooms.AsQueryable();
 
        if (filter.MinCapacity.HasValue)
            query = query.Where(r => r.Capacity >= filter.MinCapacity.Value);
 
        if (filter.Floor is { Count: > 0 })
            query = query.Where(r => filter.Floor.Contains(r.Floor));
 
        if (filter.HasProjector == true)
            query = query.Where(r => r.HasProjector);
 
        if (filter.HasTvScreen == true)
            query = query.Where(r => r.HasTvScreen);
 
        if (filter.HasVideoConferencing == true)
            query = query.Where(r => r.HasVideoConferencing);
 
        if (filter.HasWhiteboard == true)
            query = query.Where(r => r.HasWhiteboard);
 
        return await query
            .Select(r => new RoomDto
            {
                Id = r.Id,
                Name = r.Name,
                Capacity = r.Capacity,
                Floor = r.Floor,
                HasProjector = r.HasProjector,
                HasTvScreen = r.HasTvScreen,
                HasVideoConferencing = r.HasVideoConferencing,
                HasWhiteboard = r.HasWhiteboard,
                IsActive = r.IsActive,
                TotalReservationsCount = r.Reservations.Count(),
                CompletedReservationsCount = r.Reservations.Count(res => res.Status == ReservationStatus.Completed),
                CancelledReservationsCount = r.Reservations.Count(res => res.Status == ReservationStatus.Cancelled)
            })
            .ToListAsync();
    }

    public async Task<RoomFilterOptionsDto> GetFilterOptionsAsync()
    {
        var rooms = await db.Rooms.ToListAsync();

        var floors = rooms
            .Select(r => r.Floor)
            .Distinct()
            .OrderBy(f => f)
            .ToList();

        var capacities = rooms
            .Select(r => r.Capacity)
            .Distinct()
            .OrderBy(c => c)
            .ToList();

        return new RoomFilterOptionsDto
        {
            Floors = floors,
            Capacities = capacities
        };
    }
}