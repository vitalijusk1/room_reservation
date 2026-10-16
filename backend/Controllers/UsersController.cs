using Microsoft.AspNetCore.Mvc;
using RoomReservation.Api.DTOs;
using RoomReservation.Api.Services;
 
namespace RoomReservation.Api.Controllers;
 
[ApiController]
[Route("api/[controller]")]
public class UsersController(IUserService users) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetAll()
        => Ok(await users.GetAllAsync());
}