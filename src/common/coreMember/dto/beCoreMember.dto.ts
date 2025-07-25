// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';
import { Prop } from '@nestjs/mongoose';

export class BeCoreMemberDto {
   @ApiProperty({
      description: 'image',
      maxLength: 255,
      nullable: true,
   })
   @IsOptional()
   @MaxLength(255, { message: 'Tối đa 255 ký tự!' })
   image: string;

   @ApiProperty({
      description: 'image2',
      maxLength: 255,
      nullable: true,
   })
   @IsOptional()
   @MaxLength(255, { message: 'Tối đa 255 ký tự!' })
   image2: string;

   @ApiProperty({
      description: 'banner',
      maxLength: 255,
      nullable: true,
   })
   @IsOptional()
   @MaxLength(255, { message: 'Tối đa 255 ký tự!' })
   banner: string;

   @ApiProperty({
      description: 'bannerMb',
      maxLength: 255,
      nullable: true,
   })
   @IsOptional()
   @MaxLength(255, { message: 'Tối đa 255 ký tự!' })
   bannerMb: string;

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

   @IsNotEmpty({ message: 'Vị trí Vi là bắt buộc!' })
   @ApiProperty({
      description: 'position',
   })
   position: string;

   @IsNotEmpty({ message: 'Vị trí En là bắt buộc!' })
   @ApiProperty({
      description: 'position',
   })
   position_en: string;

   //BANNER
   @IsNotEmpty({ message: 'Title Banner VN là bắt buộc!' })
   @ApiProperty({
      description: 'titleBanner',
   })
   titleBanner: string;

   @IsNotEmpty({ message: 'Title Banner EN là bắt buộc!' })
   @ApiProperty({
      description: 'titleBanner_en',
   })
   titleBanner_en: string;

   @IsNotEmpty({ message: 'Sub Title Banner VN là bắt buộc!' })
   @ApiProperty({
      description: 'subTitleBanner',
   })
   subTitleBanner: string;

   @IsNotEmpty({ message: 'Sub Title Banner EN là bắt buộc!' })
   @ApiProperty({
      description: 'subTitleBanner_en',
   })
   subTitleBanner_en: string;

   @IsNotEmpty({ message: 'Description Banner VN là bắt buộc!' })
   @ApiProperty({
      description: 'descriptionBanner',
   })
   descriptionBanner: string;

   @IsNotEmpty({ message: 'Description Banner EN là bắt buộc!' })
   @ApiProperty({
      description: 'descriptionBanner_en',
   })
   descriptionBanner_en: string;

   //INTRO
   @IsNotEmpty({ message: 'Title Intro VN là bắt buộc!' })
   @ApiProperty({
      description: 'titleIntro',
   })
   titleIntro: string;

   @IsNotEmpty({ message: 'Title Intro EN là bắt buộc!' })
   @ApiProperty({
      description: 'titleIntro_en',
   })
   titleIntro_en: string;

   @IsNotEmpty({ message: 'Description Intro VN là bắt buộc!' })
   @ApiProperty({
      description: 'descriptionIntro',
   })
   descriptionIntro: string;

   @IsNotEmpty({ message: 'Description Intro EN là bắt buộc!' })
   @ApiProperty({
      description: 'descriptionIntro_en',
   })
   descriptionIntro_en: string;

   //SECTION 1
   @IsNotEmpty({ message: 'Title Section1 VN là bắt buộc!' })
   @ApiProperty({
      description: 'titleSection1',
   })
   titleSection1: string;

   @IsNotEmpty({ message: 'Title Section1 EN là bắt buộc!' })
   @ApiProperty({
      description: 'titleSection1_en',
   })
   titleSection1_en: string;

   @IsNotEmpty({ message: 'Description Section1 VN là bắt buộc!' })
   @ApiProperty({
      description: 'descriptionSection1',
   })
   descriptionSection1: string;

   @IsNotEmpty({ message: 'Description Section1 EN là bắt buộc!' })
   @ApiProperty({
      description: 'descriptionSection1_en',
   })
   descriptionSection1_en: string;

   @IsOptional()
   @ApiProperty({
      description: 'link',
   })
   link: string;

   //SECTION 2
   @IsNotEmpty({ message: 'Title Section2 Vi là bắt buộc!' })
   @ApiProperty({
      description: 'titleSection2',
   })
   titleSection2: string;

   @IsNotEmpty({ message: 'Title Section2 EN là bắt buộc!' })
   @ApiProperty({
      description: 'titleSection2_en',
   })
   titleSection2_en: string;

   @IsNotEmpty({ message: 'Description Section2 VN là bắt buộc!' })
   @ApiProperty({
      description: 'descriptionSection2',
   })
   descriptionSection2: string;

   @IsNotEmpty({ message: 'Description Section2 EN là bắt buộc!' })
   @ApiProperty({
      description: 'descriptionSection2_en',
   })
   descriptionSection2_en: string;
}
