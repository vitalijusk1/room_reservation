using Microsoft.AspNetCore.Mvc;
using RoomReservation.Api.DTOs;
using RoomReservation.Api.Services;

namespace RoomReservation.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomsController(IRoomService rooms) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<RoomDto>>> GetAll()
        => Ok(await rooms.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<RoomDto>> GetById(int id)
    {
        var room = await rooms.GetByIdAsync(id);
        return room is null ? NotFound() : Ok(room);
    }

    [HttpPost]
    public async Task<ActionResult<RoomDto>> Create(CreateRoomRequest request)
    {
        var room = await rooms.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = room.Id }, room);
    }
}
