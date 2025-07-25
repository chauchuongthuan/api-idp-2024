// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';
import { Prop } from '@nestjs/mongoose';

export class BeInvesterDto {
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

   @ApiProperty({
      description: 'category',
      required: false,
   })
   @IsOptional()
   category: string;

   @ApiProperty({
      description: 'file',
      maxLength: 255,
      nullable: true,
   })
   @IsOptional()
   // @MaxLength(255, { message: 'Tối đa 255 ký tự!' })
   file: string;

   @ApiProperty({
      type: String,
      description: 'publishedAt',
   })
   @IsNotEmpty({ message: 'Published At là bắt buộc!' })
   publishedAt: string;
}
