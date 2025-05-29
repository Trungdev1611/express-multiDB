
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/Role.decorator';
import { PayloadJwt } from 'src/modules/auth/jwtStrategy';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: Array<string> = this.reflector.get(ROLE_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<{user:PayloadJwt }>();
    //lấy từ token bên stragegy.ts đã đính kèm
    const user:PayloadJwt  = request.user;
    console.log(`user?.role`, user?.role, user)
    // console.log(`request:::Role::`, request)
    return roles.includes(user?.role)

  }
}
