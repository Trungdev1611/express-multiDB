import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDTO } from "./dto/loginDTO";
import { BaseDTO } from "../Base/BaseDTO";

@Controller("v1/auth")
export class AuthController extends BaseDTO{
  constructor (private authService: AuthService) {super()}

  @Post(`login`)
  async login(@Body() loginData: loginDTO) {
    const email = await this.authService.login(loginData)
    return super.successResponse(email)
  }
}