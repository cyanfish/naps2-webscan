using NAPS2.WebScan.LocalService;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddWindowsService(options =>
{
    options.ServiceName = "NAPS2.WebScan Service";
});

builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();