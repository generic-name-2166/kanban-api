import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ListsModule } from "./lists/lists.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardsModule } from "./cards/cards.module";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ListsModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "kanban_api",
      autoLoadEntities: true,
      synchronize: true, // TODO remove this in prod
    }),
    CardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
