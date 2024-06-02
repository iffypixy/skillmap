import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";

import {LoadUser} from "@modules/auth";

import {RoadmapController} from "./roadmap.controller";

@Module({
	controllers: [RoadmapController],
})
export class RoadmapModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoadUser).forRoutes(RoadmapController);
	}
}
