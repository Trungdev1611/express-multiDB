import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDTO } from "./dto/loginDTO";
import { BaseDTO } from "../Base/BaseDTO";

@Controller("auth")
export class AuthController extends BaseDTO{
  constructor (private authService: AuthService) {super()}

  @Post(`login`)
  async login(@Body() loginData: loginDTO) {
    const email = await this.authService.login(loginData)
    return super.successResponse(email)
  }
}