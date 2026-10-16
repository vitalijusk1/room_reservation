using Microsoft.AspNetCore.Mvc;
using RoomReservation.Api.DTOs;
using RoomReservation.Api.Services;
 
namespace RoomReservation.Api.Controllers;
 
[ApiController]
[Route("api/[controller]")]
public class RoomsController(IRoomService rooms) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<RoomDto>>> GetAll([FromQuery] RoomFilterDto filter)
        => Ok(await rooms.GetAllAsync(filter));
}