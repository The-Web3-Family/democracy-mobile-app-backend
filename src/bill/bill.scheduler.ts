import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BillService } from './bill.service';

@Injectable()
export class BillScheduler {
  constructor(private readonly billService: BillService) {}

  // @Cron('0 * * * *')
  @Cron('*/30 * * * *')
  async crawlBills() {
    console.log('Starting scheduled task to crawl bills...');
    await this.billService.fetchAndStoreBills();
  }
}
