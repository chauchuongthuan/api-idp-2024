// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';
import { Prop } from '@nestjs/mongoose';

export class BeContactWebsiteDto {
   @IsNotEmpty({ message: 'Tên là bắt buộc!' })
   @ApiProperty({
      description: 'name',
   })
   name: string;

   @IsNotEmpty({ message: 'Email là bắt buộc!' })
   @ApiProperty({
      description: 'email',
   })
   email: string;

   @IsNotEmpty({ message: 'Số điện thoại là bắt buộc!' })
   @ApiProperty()
   phone: string;

   // @ApiProperty({
   //    type: Number,
   //    description: 'status',
   // })
   // @IsNotEmpty()
   // status: number;

   @IsOptional()
   @ApiProperty({
      description: 'question',
      required: false,
   })
   question: string;

   // @IsOptional()
   // @ApiProperty({
   //    type: 'File',
   //    description: 'messageFile',
   //    required: false,
   // })
   // messageFile: any;
}
