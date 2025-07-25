import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
@Schema({
   timestamps: true,
   collection: 'coreMember',
})
export class CoreMember extends Document implements TimestampInterface {
   @Prop({
      default: null,
   })
   banner: string;

   @Prop({
      default: null,
   })
   bannerMb: string;

   @Prop({
      default: null,
   })
   image: string;

   @Prop({
      default: null,
   })
   image2: string;

   @Prop({
      required: true,
      trim: true,
   })
   name: string;

   @Prop({
      required: true,
      trim: true,
   })
   name_en: string;

   @Prop({
      required: false,
      trim: true,
   })
   nameNon: string;

   @Prop({
      required: false,
      trim: true,
   })
   nameNon_en: string;

   @Prop({
      required: true,
      trim: true,
   })
   position: string;

   @Prop({
      required: true,
      trim: true,
   })
   position_en: string;

   @Prop({
      required: true,
      trim: true,
   })
   titleBanner: string;

   @Prop({
      required: true,
      trim: true,
   })
   titleBanner_en: string;

   @Prop({
      required: true,
      trim: true,
   })
   subTitleBanner: string;

   @Prop({
      required: true,
      trim: true,
   })
   subTitleBanner_en: string;

   @Prop({
      required: true,
      trim: true,
   })
   descriptionBanner: string;

   @Prop({
      required: true,
      trim: true,
   })
   descriptionBanner_en: string;

   @Prop({
      required: true,
      trim: true,
   })
   titleIntro: string;

   @Prop({
      required: true,
      trim: true,
   })
   titleIntro_en: string;

   @Prop({
      required: true,
      trim: true,
   })
   descriptionIntro: string;

   @Prop({
      required: true,
      trim: true,
   })
   descriptionIntro_en: string;

   @Prop({
      required: true,
      trim: true,
   })
   titleSection1: string;

   @Prop({
      required: true,
      trim: true,
   })
   titleSection1_en: string;

   @Prop({
      required: true,
      trim: true,
   })
   descriptionSection1: string;

   @Prop({
      required: true,
      trim: true,
   })
   descriptionSection1_en: string;

   @Prop({
      required: false,
      trim: true,
   })
   link: string;

   @Prop({
      required: true,
      trim: true,
   })
   titleSection2: string;

   @Prop({
      required: true,
      trim: true,
   })
   titleSection2_en: string;

   @Prop({
      required: true,
      trim: true,
   })
   descriptionSection2: string;

   @Prop({
      required: true,
      trim: true,
   })
   descriptionSection2_en: string;

   @Prop({
      required: true,
      trim: true,
      unique: true,
   })
   slug: string;

   @Prop({
      default: null,
   })
   deletedAt: Date;

   @Prop()
   createdAt: Date;

   @Prop()
   updatedAt: Date;
}

export const CoreMemberSchema = SchemaFactory.createForClass(CoreMember);
CoreMemberSchema.methods.thumbnail = function (): any {
   return {
      collection: 'coreMember',
      method: 'inside',
      fields: {
         image: {},
         image2: {},
         banner: {},
         bannerMb: {},
      },
   };
};
