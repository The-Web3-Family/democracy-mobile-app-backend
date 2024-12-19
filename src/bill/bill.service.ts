import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import { PaginationMetadata } from 'src/utils/others/pagination-metadata.interface';


@Injectable()
export class BillService {
  constructor(private prisma: PrismaService) {}

    async fetchAndStoreBills(apiUrl = 'https://api.congress.gov/v3/bill?offset=0&limit=200&api_key=kzBUDtWeSAJSpyjsfcxDm7xOsR8Id6Db4Re0nPR4') {
        try {
            let currentUrl = apiUrl;
            let pageCount = 0;

            while (currentUrl) {
            console.log(`Fetching data from: ${currentUrl}`);
            const response = await axios.get(currentUrl);
            const { bills, pagination } = response.data;

            // Process bills and store them
            for (const bill of bills) {
                const existingBill = await this.prisma.bill.findUnique({
                where: { url: bill.url }, // Ensure uniqueness using URL
                });

                if (!existingBill) {
                await this.prisma.bill.create({
                    data: {
                    congress: bill.congress,
                    number: bill.number,
                    originChamber: bill.originChamber,
                    originChamberCode: bill.originChamberCode,
                    title: bill.title,
                    type: bill.type,
                    updateDate: new Date(bill.updateDate),
                    updateDateIncludingText: new Date(bill.updateDateIncludingText),
                    url: bill.url,
                    latestAction: {
                        create: {
                        actionDate: new Date(bill.latestAction.actionDate),
                        text: bill.latestAction.text,
                        },
                    },
                    },
                });
                console.log(`Stored bill: ${bill.url}`);
                } else {
                console.log(`Skipped existing bill: ${bill.url}`);
                }
            }

                currentUrl = pagination?.next 
                ? `${pagination.next}${pagination.next.includes('api_key=') ? '' : '&api_key=kzBUDtWeSAJSpyjsfcxDm7xOsR8Id6Db4Re0nPR4'}`
                : null;

                pageCount++;

                console.log(`Processed page ${pageCount}`);

            if (currentUrl) {
                console.log('Waiting for 5 minute before fetching the next page...');
                await new Promise((resolve) => setTimeout(resolve, 300000)); // 5-minute delay
            }
            }

            console.log('All bills fetched and stored successfully.');
        } catch (error) {
            console.error('Error fetching and storing bills:', error.message);
        }
    }

    async getBills(page: number = 1, perPage: number = 10){
        perPage = Math.max(perPage, 1);
        const offset = (page - 1) * perPage;

        const bills = await this.prisma.bill.findMany({
            orderBy: {
                updateDate: 'desc',
            },
            skip: offset,
            take: perPage
        });

        const totalCount = await this.prisma.bill.count();

        const totalPages = Math.ceil(totalCount / perPage);
    
        // Pagination metadata
        const metadata: PaginationMetadata = {
            totalCount,
            page,
            perPage,
            totalPages,
        };

        return {bills, metadata};
    }

    async show(billId: number) {
        // const offset = (page - 1) * perPage;

        const bill = await this.prisma.bill.findFirst({
            where: {id: billId}
        });

        if(!bill){
            throw new NotFoundException('Bill not found!');
        }

        return bill;
    }


}
