// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';
import { Prop } from '@nestjs/mongoose';

export class BeDepartmentDto {
   @IsOptional()
   @ApiProperty({
      type: 'File',
      description: 'image',
      required: false,
   })
   image: any;

   @IsOptional()
   @ApiProperty({
      type: 'File',
      description: 'imageMb',
      required: false,
   })
   imageMb: any;

   // @IsNotEmpty({ message: 'Slug là bắt buộc!' })
   // @ApiProperty({
   //    description: 'slug',
   // })
   // slug: string;

   // @IsOptional()
   // @ApiProperty({
   //    description: 'link',
   // })
   // link: string;

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

   @IsNotEmpty({ message: 'Mô tả VN là bắt buộc!' })
   @ApiProperty({
      description: 'description',
   })
   description: string;

   @IsNotEmpty({ message: 'Mô tả EN là bắt buộc!' })
   @ApiProperty({
      description: 'description_en',
   })
   description_en: string;

   @ApiProperty({
      type: Number,
      description: 'sortOrder',
      required: false,
   })
   @IsOptional()
   sortOrder: number;
}
