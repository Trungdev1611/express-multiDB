// jwt.strategy.ts - validate token, set thông tin user vào request
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DATA_CONSTANT } from 'src/constants';

export interface PayloadJwt {
    emailUser: string;
    id: number | undefined;
    role: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: DATA_CONSTANT.jwt_scret  
    });
  }

 // Trả về dữ liệu sẽ được gắn vào req.user trong validate từ hàm sign
   validate(payload: PayloadJwt) {
    return  payload;
  }
}
