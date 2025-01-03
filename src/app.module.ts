import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillModule } from './bill/bill.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { VoteModule } from './vote/vote.module';


@Module({
  imports: [
    BillModule, 
    PrismaModule,
    ScheduleModule.forRoot(),
    AuthModule,
    VoteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
