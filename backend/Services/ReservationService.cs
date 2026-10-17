using Microsoft.EntityFrameworkCore;
using RoomReservation.Api.Data;
using RoomReservation.Api.DTOs;
using RoomReservation.Api.Models;

namespace RoomReservation.Api.Services;

public class ReservationService(AppDbContext db, IConfiguration config) : IReservationService
{
    private readonly int _maxDurationDays = config.GetValue<int>("BookingRules:MaxDurationDays", 7);
    private readonly int _bookingHorizonDays = config.GetValue<int>("BookingRules:BookingHorizonDays", 90);

    public async Task<List<ReservationDto>> GetAllAsync(ReservationFilterDto filter)
    {
        var query = db.Reservations.AsQueryable();

        if (filter.RoomId.HasValue)
            query = query.Where(r => r.RoomId == filter.RoomId.Value);

        if (filter.UserId.HasValue)
            query = query.Where(r => r.UserId == filter.UserId.Value);

        if (filter.Status.HasValue)
            query = query.Where(r => r.Status == filter.Status.Value);

        if (filter.StartDate.HasValue)
            query = query.Where(r => r.EndDate >= filter.StartDate.Value);

        if (filter.EndDate.HasValue)
            query = query.Where(r => r.StartDate <= filter.EndDate.Value);

        return await query
            .Select(r => new ReservationDto
            {
                Id = r.Id,
                Title = r.Title,
                RoomId = r.RoomId,
                RoomName = r.Room.Name,
                UserId = r.UserId,
                OrganizerName = r.User.FirstName + " " + r.User.LastName,
                StartDate = r.StartDate,
                EndDate = r.EndDate,
                AttendeesCount = r.AttendeesCount,
                Status = r.Status
            })
            .ToListAsync();
    }

    public async Task<ReservationFilterOptionsDto> GetFilterOptionsAsync()
    {
        var rooms = await db.Rooms
            .Select(r => new ReservationRoomOptionDto { Id = r.Id, Name = r.Name })
            .ToListAsync();

        var organizers = await db.Users
            .Select(u => new ReservationOrganizerOptionDto { Id = u.Id, Name = u.FirstName + " " + u.LastName })
            .ToListAsync();

        return new ReservationFilterOptionsDto
        {
            Rooms = rooms,
            Organizers = organizers
        };
    }

    public async Task<ReservationDto> CreateAsync(CreateReservationRequest request)
    {
        var room = await db.Rooms.FindAsync(request.RoomId);
        if (room is null)
            throw new InvalidOperationException("Room does not exist.");

        var user = await db.Users.FindAsync(request.UserId);
        if (user is null)
            throw new InvalidOperationException("Organizer user does not exist.");

        var now = DateTime.UtcNow;

        if (request.StartDate <= now || request.EndDate <= request.StartDate)
            throw new InvalidOperationException("Start date must be in the future and end date must be after start date.");

        if ((request.EndDate - request.StartDate).TotalDays > _maxDurationDays)
            throw new InvalidOperationException($"A reservation cannot last longer than {_maxDurationDays} days.");

        if ((request.StartDate - now).TotalDays > _bookingHorizonDays)
            throw new InvalidOperationException($"A reservation cannot start more than {_bookingHorizonDays} days in the future.");

        if (!room.IsActive)
            throw new InvalidOperationException("Inactive rooms cannot be booked.");

        if (request.AttendeesCount <= 0 || request.AttendeesCount > room.Capacity)
            throw new InvalidOperationException($"Number of attendees must be between 1 and the room capacity ({room.Capacity}).");

        var roomOverlap = await db.Reservations.AnyAsync(r =>
            r.RoomId == request.RoomId &&
            r.Status == ReservationStatus.Booked &&
            request.StartDate < r.EndDate &&
            request.EndDate > r.StartDate);

        if (roomOverlap)
            throw new InvalidOperationException("This room already has an active reservation during the selected time.");

        var userOverlap = await db.Reservations.AnyAsync(r =>
            r.UserId == request.UserId &&
            r.Status == ReservationStatus.Booked &&
            request.StartDate < r.EndDate &&
            request.EndDate > r.StartDate);

        if (userOverlap)
            throw new InvalidOperationException("The organizer already has another active reservation during the selected time.");

        var reservation = new Reservation
        {
            Title = request.Title,
            RoomId = request.RoomId,
            UserId = request.UserId,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            AttendeesCount = request.AttendeesCount,
            Status = ReservationStatus.Booked
        };

        db.Reservations.Add(reservation);
        await db.SaveChangesAsync();

        var dto = new ReservationDto
        {
            Id = reservation.Id,
            Title = reservation.Title,
            RoomId = room.Id,
            RoomName = room.Name,
            UserId = user.Id,
            OrganizerName = user.FirstName + " " + user.LastName,
            StartDate = reservation.StartDate,
            EndDate = reservation.EndDate,
            AttendeesCount = reservation.AttendeesCount,
            Status = reservation.Status
        };

        return dto;
    }

    public async Task CancelAsync(int id)
    {
        var reservation = await db.Reservations.FindAsync(id);
        if (reservation is null)
            throw new InvalidOperationException("Reservation not found.");

        if (reservation.Status != ReservationStatus.Booked)
            throw new InvalidOperationException("Only active (Booked) reservations can be cancelled.");

        reservation.Status = ReservationStatus.Cancelled;
        await db.SaveChangesAsync();
    }

    public async Task EndEarlyAsync(int id)
    {
        var reservation = await db.Reservations.FindAsync(id);
        if (reservation is null)
            throw new InvalidOperationException("Reservation not found.");

        if (reservation.Status != ReservationStatus.Booked)
            throw new InvalidOperationException("Only active (Booked) reservations can be ended early.");

        reservation.Status = ReservationStatus.Completed;
        reservation.EndDate = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }
}