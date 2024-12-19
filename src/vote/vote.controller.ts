import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VoteService } from './vote.service';
import { AuthUser } from 'src/auth/user/auth-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { VoteDto } from './dto/vote.dto';

@Controller('vote')
@ApiTags('vote')
export class VoteController {
    constructor(private voteService: VoteService){}

    @Post(':billId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    async makeVote(
        @AuthUser() user: any,
        @Param('billId') billId: number,
        @Body() voteDto: VoteDto,
      ) {
        const userId = user.id;
        return this.voteService.doVote(userId, billId, voteDto);
    }
}
