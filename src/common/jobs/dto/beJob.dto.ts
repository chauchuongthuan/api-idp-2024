// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';
import { Prop } from '@nestjs/mongoose';
import { IsValidTrans } from '@src/core/validator/IsValidTrans';

export class BeJobDto {
   @IsNotEmpty({ message: 'Slug là bắt buộc!' })
   @ApiProperty({
      description: 'slug',
   })
   slug: string;

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

   @IsOptional()
   @ApiProperty({
      description: 'nameNon',
   })
   nameNon: string;

   @IsOptional()
   @ApiProperty({
      description: 'nameNon_en',
   })
   nameNon_en: string;

   @ApiProperty({
      type: Number,
      description: 'quantity',
      required: true,
   })
   @IsNotEmpty({ message: 'Số lượng tuyển dụng là bắt buộc!' })
   quantity: number;

   @ApiProperty({
      description: 'department',
      required: false,
   })
   @IsOptional()
   department: string;

   @ApiProperty({
      description: 'occupation',
      required: false,
   })
   @IsOptional()
   occupation: string;

   @ApiProperty({
      description: 'workplace',
      required: false,
   })
   @IsOptional()
   workplace: string;

   @ApiProperty({
      description: 'positionLevel',
      required: false,
   })
   @IsOptional()
   positionLevel: string;

   @ApiProperty({
      description: 'salary',
      required: false,
   })
   @IsOptional()
   salary: string;

   @ApiProperty({
      description: 'employment',
      required: false,
   })
   @IsOptional()
   employment: string;

   @ApiProperty({
      description: 'qualification',
      required: false,
   })
   @IsOptional()
   qualification: string;

   @ApiProperty({
      description: 'experience',
      required: false,
   })
   @IsOptional()
   experience: string;

   @ApiProperty({
      description: 'jobTag',
   })
   @IsOptional()
   jobTag: Array<string> = [];

   @ApiProperty({
      type: Object,
      description: 'content',
      required: true,
   })
   @IsOptional()
   content: object;

   @ApiProperty({
      type: String,
      description: 'deadline',
   })
   @IsOptional()
   deadline: string;

   @IsOptional()
   imageRms: Array<any>;
}
