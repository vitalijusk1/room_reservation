using RoomReservation.Api.Models;

namespace RoomReservation.Api.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (db.Rooms.Any())
        {
            return;
        }

        var rooms = new List<Room>
        {
            new()
            {
                Name = "Red Room",
                Capacity = 8,
                Floor = "1st",
                HasProjector = true,
                HasTvScreen = true,
                HasVideoConferencing = false,
                HasWhiteboard = true,
                IsActive = true
            },
            new()
            {
                Name = "Blue Room",
                Capacity = 4,
                Floor = "2nd",
                HasProjector = false,
                HasTvScreen = true,
                HasVideoConferencing = true,
                HasWhiteboard = false,
                IsActive = true
            },
            new()
            {
                Name = "Green Room",
                Capacity = 12,
                Floor = "1st",
                HasProjector = true,
                HasTvScreen = true,
                HasVideoConferencing = true,
                HasWhiteboard = true,
                IsActive = false
            }
        };

        var users = new List<User>
        {
            new() { FirstName = "Alice", LastName = "Smith" },
            new() { FirstName = "Bob", LastName = "Jones" },
            new() { FirstName = "Charlie", LastName = "Brown" }
        };

        db.Rooms.AddRange(rooms);
        db.Users.AddRange(users);
        db.SaveChanges();

        var redRoom = rooms[0];
        var blueRoom = rooms[1];
        var alice = users[0];
        var bob = users[1];
        var charlie = users[2];
        var now = DateTime.UtcNow;

        var reservations = new List<Reservation>
        {
            new()
            {
                Title = "Sprint Planning",
                RoomId = redRoom.Id,
                UserId = alice.Id,
                StartDate = now.AddDays(2).Date.AddHours(10),
                EndDate = now.AddDays(2).Date.AddHours(11),
                AttendeesCount = 6,
                Status = ReservationStatus.Booked
            },
            new()
            {
                Title = "Client Demo",
                RoomId = blueRoom.Id,
                UserId = bob.Id,
                StartDate = now.AddDays(5).Date.AddHours(14),
                EndDate = now.AddDays(5).Date.AddHours(15).AddMinutes(30),
                AttendeesCount = 3,
                Status = ReservationStatus.Booked
            },
            new()
            {
                Title = "Quarterly Review",
                RoomId = redRoom.Id,
                UserId = charlie.Id,
                StartDate = now.AddDays(-7).Date.AddHours(9),
                EndDate = now.AddDays(-7).Date.AddHours(10),
                AttendeesCount = 8,
                Status = ReservationStatus.Completed
            },
            new()
            {
                Title = "1:1 Sync",
                RoomId = blueRoom.Id,
                UserId = alice.Id,
                StartDate = now.AddDays(-3).Date.AddHours(13),
                EndDate = now.AddDays(-3).Date.AddHours(13).AddMinutes(30),
                AttendeesCount = 2,
                Status = ReservationStatus.Completed
            },
            new()
            {
                Title = "Design Workshop",
                RoomId = redRoom.Id,
                UserId = bob.Id,
                StartDate = now.AddDays(10).Date.AddHours(9),
                EndDate = now.AddDays(10).Date.AddHours(12),
                AttendeesCount = 5,
                Status = ReservationStatus.Cancelled
            }
        };

        db.Reservations.AddRange(reservations);
        db.SaveChanges();
    }
}
