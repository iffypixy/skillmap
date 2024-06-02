import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {Request} from "express";

@Injectable()
export class IsAuthenticated implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const req: Request = context.switchToHttp().getRequest();

		return Boolean(req.session) && Boolean(req.session.user);
	}
}
