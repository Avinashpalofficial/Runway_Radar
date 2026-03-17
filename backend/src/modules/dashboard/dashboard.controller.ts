import { catchAsyncError } from "../../middlewares/catchAsync";
import * as dashboardService from "./dashboard.service";

export const getDashboard = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;

  const metrics = await dashboardService.getDashboardMetrics(userId);

  res.status(200).json({
    success: true,
    data: metrics,
  });
});
