using Microsoft.AspNet.SignalR;

namespace SignalrWebService.Hubs
{
    public class LoggingHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }
    }
}