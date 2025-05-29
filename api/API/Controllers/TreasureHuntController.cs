using API.Helper;
using API.Models;
using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
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

        [Route("solveHistory")]
        [HttpGet]
        public IActionResult SolveHistory(int pageIndex = 1, int pageSize = 1, string matrixSearchKey = "")
        {
            try
            {
                int totalRow = 0;
                var listHotel = _treasureHuntBS.GetPaging(pageIndex, pageSize, ref totalRow, "where Matrix like '%" + matrixSearchKey + "%'", "ModifiedDate desc");
                return ReturnSuccess(new { listHotel, pageIndex, pageSize, totalRow });
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }
        
    }
}