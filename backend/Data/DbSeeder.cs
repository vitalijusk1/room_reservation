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
    }
}
