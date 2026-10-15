using Microsoft.AspNetCore.Mvc;
using RoomReservation.Api.DTOs;
using RoomReservation.Api.Services;

namespace RoomReservation.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReservationsController(IReservationService reservations) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ReservationDto>>> GetAll([FromQuery] ReservationFilterDto filter)
        => Ok(await reservations.GetAllAsync(filter));

    [HttpPost]
    public async Task<ActionResult<ReservationDto>> Create(CreateReservationRequest request)
    {
        try
        {
            var dto = await reservations.CreateAsync(request);
            return Ok(dto);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("{id}/cancel")]
    public async Task<IActionResult> Cancel(int id)
    {
        try
        {
            await reservations.CancelAsync(id);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("{id}/end-early")]
    public async Task<IActionResult> EndEarly(int id)
    {
        try
        {
            await reservations.EndEarlyAsync(id);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}