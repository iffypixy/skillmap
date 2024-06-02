import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";

import {config} from "@lib/config";
import {PrismaModule} from "@lib/prisma";
import {RoadmapModule} from "@modules/roadmap";
import {AuthModule} from "@modules/auth";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config],
		}),
		PrismaModule.forRoot(),
		RoadmapModule,
		AuthModule,
	],
})
export class AppModule {}
