import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";


export class VoteDto{

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    optionId: number;
}