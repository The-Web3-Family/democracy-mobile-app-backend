import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BillService } from './bill.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthUser } from 'src/auth/user/auth-user.decorator';

@Controller('bill')
@ApiTags('bills')
export class BillController {
    constructor(private billService: BillService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    async getBills(
        // @AuthUser() user: any,
        @Query('page') page: number = 1,
        @Query('perPage') perPage: number = 10
    ){
        // const authUserId = user.id;
        return await this.billService.getBills(page, perPage);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    async findBill(
        @Param('id') billId: number,
        @AuthUser() user: any
    ){
        const userId = user.id;
        return await this.billService.show(billId, userId);
    }


}
