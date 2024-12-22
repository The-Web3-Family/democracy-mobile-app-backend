import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VoteDto } from './dto/vote.dto';

@Injectable()
export class VoteService {
    constructor(private prisma: PrismaService){}

    async doVote(userId: number, billId: number, voteDto: VoteDto) {

        const optionId = voteDto.optionId;

        const bill = await this.prisma.bill.findFirst({
            where: { id: billId }
        });
    
        if (!bill) {
            throw new NotFoundException('The Bill was not found!');
        }
    
        const existingVote = await this.prisma.vote.findFirst({
            where: { userId, billId },
            include: { option: true }, 
        });
    
        if (!existingVote) {
            return await this.prisma.vote.create({
                data: { userId, billId, optionId },
            });
        }
    
        const newOption = await this.prisma.votingOption.findUnique({
            where: { id: optionId },
        });
    
        if (!newOption) {
            throw new NotFoundException('The Voting Option was not found!');
        }
    
        await this.prisma.voteHistory.create({
            data: {
                vote: {
                    connect: { id: existingVote.id },
                },
                oldOption: {
                    connect: { id: existingVote.option.id },
                },
                newOption: {
                    connect: { id: newOption.id },
                },
            },
        });
        
    
        return this.prisma.vote.update({
            where: { id: existingVote.id },
            data: { optionId },
        });
    }
    
}
