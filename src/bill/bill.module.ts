import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { BillScheduler } from './bill.scheduler';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  controllers: [BillController],
  imports: [PrismaModule],
  providers: [BillService, BillScheduler]
})
export class BillModule {}
