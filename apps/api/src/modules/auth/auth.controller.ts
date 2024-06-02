import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Session,
	UseGuards,
} from "@nestjs/common";
import {SessionWithData} from "express-session";
import bcrypt from "bcryptjs";

import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";

import {IsAuthenticated} from "./is-authenticated.guard";
import * as dtos from "./dtos";

@Controller("auth")
export class AuthController {
	constructor(private readonly prisma: PrismaService) {}

	@UseGuards(IsAuthenticated)
	@Get("credentials")
	getCredentials(@Session() session: SessionWithData) {
		return {
			credentials: sanitized.credentials(session.user),
		};
	}

	@Post("register")
	async signUp(
		@Session() session: SessionWithData,
		@Body() dto: dtos.SignUpDto,
	) {
		const existing = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
			},
		});

		if (existing)
			throw new BadRequestException(
				"User with provided email is already created",
			);

		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(dto.password, salt);

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				password: hash,
				isAnonymous: false,
			},
		});

		session.user = user;
		session.userId = user.id;

		return {
			credentials: user,
		};
	}

	@Post("login")
	async signIn(
		@Session() session: SessionWithData,
		@Body() dto: dtos.SignInDto,
	) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
				isAnonymous: false,
			},
		});

		const exception = new BadRequestException("Invalid credentials");

		if (!user) throw exception;

		const passwordsMatch = await bcrypt.compare(
			dto.password,
			user.password,
		);

		if (!passwordsMatch) throw exception;

		session.user = user;
		session.userId = user.id;

		return {
			credentials: user,
		};
	}

	@Post("register/anonym")
	async signUpAnonymously(@Session() session: SessionWithData) {
		const user = await this.prisma.user.create({
			data: {
				sessionId: session.id,
				isAnonymous: true,
			},
		});

		session.user = user;
		session.userId = user.id;

		return {
			credentials: user,
		};
	}
}
