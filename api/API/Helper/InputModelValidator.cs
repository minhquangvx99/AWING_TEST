using API.Models;
using System.Collections.Generic;

namespace API.Helper
{
    public class InputModelValidator
    {
        public static List<string> Validate(InputModel model)
        {
            var errors = new List<string>();

            if (model.NRow < 1 || model.NRow > 500)
                errors.Add("NRow phải nằm trong khoảng từ 1 đến 500.");
            if (model.MColumn < 1 || model.MColumn > 500)
                errors.Add("MColumn phải nằm trong khoảng từ 1 đến 500.");
            if (errors.Count > 0)
            {
                return errors;
            }
            if (model.P < 1 || model.P > model.NRow * model.MColumn)
                errors.Add($"P phải nằm trong khoảng từ 1 đến NRow * MColumn = {model.NRow* model.MColumn}.");
            if (model.Matrix == null || model.Matrix.Length != model.NRow)
            {
                errors.Add($"Matrix phải có đúng số hàng NRow = {model.NRow}.");
            }
            else
            {
                var numberSet = new HashSet<int>();

                for (int i = 0; i < model.NRow; i++)
                {
                    if (model.Matrix[i] == null || model.Matrix[i].Length != model.MColumn)
                    {
                        errors.Add($"Hàng {i} trong Matrix phải có đúng số cột MColumn = {model.MColumn}.");
                        continue;
                    }

                    for (int j = 0; j < model.MColumn; j++)
                    {
                        int val = model.Matrix[i][j];
                        if (val < 1 || val > model.P)
                        {
                            errors.Add($"Giá trị tại vị trí ({i}, {j}) = {val} phải nằm trong khoảng từ 1 đến P = {model.P}.");
                        }
                        numberSet.Add(val);
                    }
                }

                for (int k = 1; k <= model.P; k++)
                {
                    if (!numberSet.Contains(k))
                    {
                        errors.Add($"Giá trị {k} không tồn tại trong Matrix. Matrix phải bao gồm đủ các giá trị từ 1 đến P = {model.P} để có thể đến được kho báu");
                    }
                }
            }

            return errors;
        }
    }
}
