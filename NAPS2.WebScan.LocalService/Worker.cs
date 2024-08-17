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

        using var scanServer = new ScanServer(scanningContext, new EsclServer
        {
            // This line is required for scanning from a browser to work
            SecurityPolicy = EsclSecurityPolicy.ServerAllowAnyOrigin
        });

        // Pick the first WIA device to share; you might want to do something else here
        // depending on your use case.
        //
        // Note: Driver.Twain currently doesn't work from a Windows Service
        var devices = await controller.GetDeviceList(Driver.Wia);
        var firstDevice = devices.First();

        // You'll need to manually specify a port as device discovery doesn't work from a browser.
        // If you're sharing multiple devices make sure to give them each a unique port number.
        scanServer.RegisterDevice(firstDevice, port: 9880);

        // Share the device(s) until the service is stopped
        await scanServer.Start();
        await stoppingToken.WaitHandle.WaitOneAsync();
        await scanServer.Stop();
    }
}