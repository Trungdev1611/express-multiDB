import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException} from '@nestjs/common';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err:Error, user: any):any {
        if (err || !user) {
          throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
        }
        console.log(`userJwtAuthGuard`, user)
        return user;
      }
}
