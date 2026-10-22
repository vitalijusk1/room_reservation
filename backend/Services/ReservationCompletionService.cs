namespace RoomReservation.Api.Services;

public class ReservationCompletionService(IServiceScopeFactory scopeFactory) : BackgroundService
{
    private static readonly TimeSpan Interval = TimeSpan.FromMinutes(1);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(Interval);

        do
        {
            using var scope = scopeFactory.CreateScope();
            var reservations = scope.ServiceProvider.GetRequiredService<IReservationService>();
            await reservations.CompleteFinishedAsync();
        }
        while (await timer.WaitForNextTickAsync(stoppingToken));
    }
}
