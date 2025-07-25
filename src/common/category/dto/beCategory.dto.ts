// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';
import { Prop } from '@nestjs/mongoose';

export class BeCategoryDto {
   @ApiProperty({
      description: 'parentId',
      required: false,
   })
   @IsOptional()
   parentId: string;

   @IsNotEmpty({ message: 'Title là bắt buộc!' })
   @ApiProperty()
   title: string;

   @IsNotEmpty({ message: 'Slug là bắt buộc!' })
   @ApiProperty()
   slug: string;

   @IsOptional()
   @ApiProperty()
   titleNon: string;

   @IsNotEmpty({ message: 'Title En là bắt buộc!' })
   @ApiProperty()
   title_en: string;

   @IsOptional()
   @ApiProperty()
   titleNon_en: string;

   @IsNotEmpty({ message: 'Active là bắt buộc!' })
   @ApiProperty()
   active: boolean;
}
