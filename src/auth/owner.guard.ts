import { type CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class OwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // user from AuthGuard
    const user = request.user;
    const userId = request.params.userId;

    return user.sub === userId;
  }
}
