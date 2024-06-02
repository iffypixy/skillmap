import {IsEmail, Min, Max, IsString} from "class-validator";

export class SignInDto {
	@IsEmail()
	email: string;

	@IsString()
	@Min(8)
	@Max(100)
	password: string;
}
