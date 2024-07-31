import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import globalMsg from 'src/globalMsg';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService,) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token is required for authorization');
    }

    try {
      const payload: any = await verify(token, process.env.JWTKEY);

      if (!payload || !payload.userId) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const user: any = await this.authService.getUserByToken(payload.userId)
      if (!user.result) {
        // return user
        throw new NotFoundException(globalMsg.USER_NOT_FOUND);
      }
      request.user = user;
      request.user1 = user?.result;
      return true;
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      }
      throw err;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
