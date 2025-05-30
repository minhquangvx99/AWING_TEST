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

        [HttpGet]
        public IActionResult SolveHistory(int pageIndex = 1, int pageSize = 10, string matrixSearchKey = "")
        {
            try
            {
                int totalRow = 0;
                var listSolveHistory = _treasureHuntBS.GetSolveHistoryPaging(pageIndex, pageSize, matrixSearchKey, ref totalRow);
                return ReturnSuccess(new { listSolveHistory, pageIndex, pageSize, totalRow });
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("detail/{treasureHuntId}")]
        [HttpGet]
        public IActionResult getTreasureHuntById(int treasureHuntId)
        {
            try
            {
                var treasureHunt = _treasureHuntBS.GetById(treasureHuntId);
                return ReturnSuccess(treasureHunt);
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [HttpDelete]
        public IActionResult Delete(int treasureHuntId)
        {
            try
            {
                var treasureHunt = _treasureHuntBS.GetById(treasureHuntId);
                if (treasureHunt == null) return ReturnError("Hotel does not exist");
                bool rs = _treasureHuntBS.Delete(treasureHunt);
                if (rs == false) return ReturnError("Delete Hotel failed");

                return ReturnSuccess(new { }, "Deleted successfully");
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

    }
}