import { type CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class OwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // user from AuthGuard
    const user = request.user;
    const userId = parseInt(request.params.userId);

    return !isNaN(userId) && user.sub === userId;
  }
}
