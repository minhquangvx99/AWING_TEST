using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    public class BaseController : Controller
    {
        protected IActionResult ReturnSuccess()
        {
            return new OkObjectResult(new
            {
                Success = true,
                Message = ""
            });
        }
        protected IActionResult ReturnSuccess(object data)
        {
            return new OkObjectResult(new
            {
                Data = data,
                Success = true,
                Message = ""
            });
        }
        protected IActionResult ReturnSuccess(object data, string mesage)
        {
            return new OkObjectResult(new
            {
                Data = data,
                Success = true,
                Message = mesage,
            });
        }
        protected IActionResult ReturnError(Exception ex)
        {
            return new OkObjectResult(new
            {
                Success = false,
                Message = ex.Message.ToString(),
                Trace = ex.StackTrace.ToString()
            });
        }
        protected IActionResult ReturnError()
        {
            return new OkObjectResult(new
            {
                Success = false,
                Message = "",
                Trace = "",
            });
        }
        protected IActionResult ReturnError(string mesage)
        {
            return new OkObjectResult(new
            {
                Success = false,
                Message = mesage,
                Trace = "",
            });
        }
    }
}