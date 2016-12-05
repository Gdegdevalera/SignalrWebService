using Microsoft.AspNet.Mvc;

namespace SignalrWebService.Controllers
{
    public class HomeController : Controller
    {
	    public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
	}
}
