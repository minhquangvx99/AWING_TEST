using API.Helper;
using API.Models;
using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreasureHuntController : BaseController
    {
        private readonly ITreasureHuntBS _treasureHuntBS;

        public TreasureHuntController(ITreasureHuntBS treasureHuntBS)
        {
            _treasureHuntBS = treasureHuntBS;
        }

        [Route("solve")]
        [HttpPost]
        public IActionResult Solve([FromBody] InputModel input)
        {
            try
            {
                var errors = InputModelValidator.Validate(input);
                if (errors.Count == 0)
                {
                    var result = _treasureHuntBS.FindMinimumFuel(input.Id, input.NRow, input.MColumn, input.P, input.Matrix);
                    if (result == null)
                    {
                        return ReturnError("Lỗi hệ thống");
                    }
                    else
                    {
                        return ReturnSuccess(result);
                    }
                }
                else
                {
                    return ReturnError(string.Join(Environment.NewLine, errors));
                }
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }
        
    }
}