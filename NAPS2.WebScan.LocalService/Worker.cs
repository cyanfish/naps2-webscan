using NAPS2.Escl;
using NAPS2.Escl.Server;
using NAPS2.Images.ImageSharp;
using NAPS2.Remoting.Server;
using NAPS2.Scan;
using NAPS2.Threading;

namespace NAPS2.WebScan.LocalService;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;

    public Worker(ILogger<Worker> logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var scanningContext = new ScanningContext(new ImageSharpImageContext());
        var controller = new ScanController(scanningContext);

        var devices = await controller.GetDeviceList();
        var first = devices.First();

        using var scanServer = new ScanServer(scanningContext, new EsclServer
        {
            SecurityPolicy = EsclSecurityPolicy.ServerAllowAnyOrigin
        });
        scanServer.RegisterDevice(first, port: 9880);

        await scanServer.Start();
        await stoppingToken.WaitHandle.WaitOneAsync();
        await scanServer.Stop();
    }
}