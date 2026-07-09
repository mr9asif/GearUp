import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
const updateProfile = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const result = await UserService.updateProfile(
    userId,
    req.body,
    req.file
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile updated successfully",
    data: result,
  });
});


export const UserController = {
    updateProfile
}