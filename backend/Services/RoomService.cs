using Microsoft.EntityFrameworkCore;
using RoomReservation.Api.Data;
using RoomReservation.Api.DTOs;
using RoomReservation.Api.Models;

namespace RoomReservation.Api.Services;

public class RoomService(AppDbContext db) : IRoomService
{
    public async Task<List<RoomDto>> GetAllAsync()
    {
        return await db.Rooms
            .Select(r => new RoomDto { Id = r.Id, Name = r.Name, Capacity = r.Capacity })
            .ToListAsync();
    }

    public async Task<RoomDto?> GetByIdAsync(int id)
    {
        var room = await db.Rooms.FindAsync(id);
        return room is null
            ? null
            : new RoomDto { Id = room.Id, Name = room.Name, Capacity = room.Capacity };
    }

    public async Task<RoomDto> CreateAsync(CreateRoomRequest request)
    {
        var room = new Room { Name = request.Name, Capacity = request.Capacity };
        db.Rooms.Add(room);
        await db.SaveChangesAsync();
        return new RoomDto { Id = room.Id, Name = room.Name, Capacity = room.Capacity };
    }
}
