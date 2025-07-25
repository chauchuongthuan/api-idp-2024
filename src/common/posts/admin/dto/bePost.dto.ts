import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, MaxLength, IsIn } from 'class-validator';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';
import { IsValidTrans } from '@core/validator/IsValidTrans';
import { MyDate } from '@core/validator/myDate';
import { StatusEnum } from '@core/constants/post.enum';
import { IsValidFileTrans } from '@src/core/validator/IsValidFileTrans';
export class BePostDto {
   @ApiProperty({
      description: 'postCategory',
      required: false,
   })
   @IsOptional()
   postCategory: string;

   @ApiProperty({
      description: 'tags',
   })
   @IsOptional()
   tags: Array<string> = [];

   @ApiProperty({
      description: 'image',
      maxLength: 255,
      nullable: true,
   })
   @IsOptional()
   @MaxLength(255, { message: 'Tối đa 255 ký tự!' })
   // @IsExistFileTmp([], { message: 'Hình ảnh không hợp lệ!' })
   image: string;

   @ApiProperty({
      description: 'imageMb',
      maxLength: 255,
      nullable: true,
   })
   @IsOptional()
   @MaxLength(255, { message: 'Tối đa 255 ký tự' })
   // @IsExistFileTmp([], { message: 'Hình ảnh di động không hợp lệ!' })
   imageMb: string;

   @ApiProperty({
      description: 'thumbImage',
      maxLength: 255,
      nullable: true,
   })
   @IsOptional()
   @MaxLength(255, { message: 'Tối đa 255 ký tự!' })
   // @IsExistFileTmp([], { message: 'Hình ảnh không hợp lệ!' })
   thumbImage: string;

   @ApiProperty({
      description: 'thumbImageMb',
      maxLength: 255,
      nullable: true,
   })
   @IsOptional()
   @MaxLength(255, { message: 'Tối đa 255 ký tự' })
   // @IsExistFileTmp([], { message: 'Hình ảnh di động không hợp lệ!' })
   thumbImageMb: string;

   @ApiProperty({
      type: Number,
      description: 'sortOrder',
      required: false,
   })
   @IsOptional()
   sortOrder: number;

   @ApiProperty({
      type: String,
      description: 'title',
      required: true,
   })
   @IsNotEmpty()
   title: string;

   @ApiProperty({
      type: String,
      description: 'title_en',
      required: true,
   })
   @IsNotEmpty()
   title_en: string;

   @ApiProperty({
      type: String,
      description: 'slug',
      required: true,
   })
   @IsNotEmpty()
   slug: string;

   @ApiProperty({
      type: String,
      description: 'shortDescription',
      required: false,
   })
   @IsOptional()
   shortDescription: string;

   @ApiProperty({
      type: String,
      description: 'shortDescription_en',
      required: false,
   })
   @IsOptional()
   shortDescription_en: string;

   @ApiProperty({
      type: Object,
      description: 'content',
      required: false,
   })
   @IsNotEmpty()
   content: string;

   @ApiProperty({
      type: Object,
      description: 'content_en',
      required: false,
   })
   @IsNotEmpty()
   content_en: string;

   @ApiProperty({
      type: Number,
      description: 'status',
      required: true,
   })
   @IsNotEmpty({ message: 'Trạng thái là bắt buộc!' })
   @IsIn(
      Object.keys(StatusEnum)
         .map((k) => StatusEnum[k].toString())
         .filter((k) => parseInt(k)),
   )
   status: number;

   @ApiProperty({
      description: 'feature',
      required: false,
   })
   @IsOptional()
   feature: boolean;

   @ApiProperty({
      type: String,
      description: 'publishedAt',
   })
   @IsOptional()
   // @MyDate(['YYYY-MM-DD HH:mm:ss'], { message: 'Ngày đăng không hợp lệ!' })
   publishedAt: string;

   // @ApiProperty({
   //    type: String,
   //    description: 'readTime',
   //    required: true,
   // })
   // @IsNotEmpty()
   // readTime: string;

   // @ApiProperty({
   //    description: 'sortOrder',
   //    required: false,
   // })
   // // @IsNotEmpty({message: 'Thứ tự là bắt buộc!'})
   // @IsOptional()
   // sortOrder: number;

   @ApiProperty({ required: false })
   @IsOptional()
   metaTitle: string;

   @ApiProperty({
      description: 'metaImage',
      required: false,
   })
   @IsOptional()
   metaImage: string;

   @ApiProperty({
      type: String,
      description: 'meta description',
      required: false,
   })
   @IsOptional()
   metaDescription: string;

   @ApiProperty({
      type: String,
      description: 'meta keyword',
      required: false,
   })
   @IsOptional()
   metaKeyword: string;
}
