// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';
import { Prop } from '@nestjs/mongoose';

export class BeApplicationDto {
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

   @IsNotEmpty({ message: 'Năm sinh là bắt buộc!' })
   @ApiProperty()
   birthdate: string;

   @ApiProperty({
      description: 'job',
      required: true,
   })
   @IsNotEmpty({ message: 'Công việc là bắt buộc!' })
   job: string;

   @ApiProperty({
      description: 'file',
      maxLength: 255,
      nullable: true,
   })
   @IsOptional()
   @MaxLength(255, { message: 'Tối đa 255 ký tự!' })
   file: string;
}
