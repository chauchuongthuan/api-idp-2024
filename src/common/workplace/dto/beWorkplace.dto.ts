// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';
import { Prop } from '@nestjs/mongoose';

export class BeWorkplaceDto {
   // @IsNotEmpty({ message: 'Slug là bắt buộc!' })
   // @ApiProperty({
   //    description: 'slug',
   // })
   // slug: string;

   @IsNotEmpty({ message: 'Tên VN là bắt buộc!' })
   @ApiProperty({
      description: 'name',
   })
   name: string;

   @IsNotEmpty({ message: 'Tên EN là bắt buộc!' })
   @ApiProperty({
      description: 'name_en',
   })
   name_en: string;
}
