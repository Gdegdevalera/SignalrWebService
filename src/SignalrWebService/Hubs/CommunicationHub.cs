using Microsoft.AspNet.SignalR;

namespace SignalrWebService.Hubs
{
    public class CommunicationHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }
    }
}