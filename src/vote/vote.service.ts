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
            include: { option: true }, // Include the option relationship
        });
    
        if (!existingVote) {
            // Create a new vote
            return await this.prisma.vote.create({
                data: { userId, billId, optionId },
            });
        }
    
        // Create history for the old vote
        const newOption = await this.prisma.votingOption.findUnique({
            where: { id: optionId },
        });
    
        if (!newOption) {
            throw new NotFoundException('The Voting Option was not found!');
        }
    
        await this.prisma.voteHistory.create({
            data: {
                vote: {
                    connect: { id: existingVote.id }, // Relate the vote using its ID
                },
                oldOption: {
                    connect: { id: existingVote.option.id }, // Relate the old option using its ID
                },
                newOption: {
                    connect: { id: newOption.id }, // Relate the new option using its ID
                },
            },
        });
        
    
        // Update the vote
        return this.prisma.vote.update({
            where: { id: existingVote.id },
            data: { optionId },
        });
    }
    
}
