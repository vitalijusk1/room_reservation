using Microsoft.AspNetCore.Mvc;
using RoomReservation.Api.Services;

namespace RoomReservation.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomsController(IRoomService rooms) : ControllerBase
{
}
