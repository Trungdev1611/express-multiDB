import { Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor (private authService: AuthService) {}

  @Post(`login`)
  async login(@Req() req: Request) {
    return this.authService.login()
  }
}