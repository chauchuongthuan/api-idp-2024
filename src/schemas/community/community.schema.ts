import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
@Schema({
   timestamps: true,
   collection: 'community',
})
export class Community extends Document implements TimestampInterface {
   @Prop({
      required: false,
      trim: true,
   })
   image: string;

   @Prop({
      required: false,
      trim: true,
   })
   imageMb: string;

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
   slug: string;

   @Prop({
      required: true,
      trim: true,
   })
   description: string;

   @Prop({
      required: true,
      trim: true,
   })
   description_en: string;

   @Prop({
      required: false,
      trim: true,
   })
   shortDescription: string;

   @Prop({
      required: false,
      trim: true,
   })
   shortDescription_en: string;

   @Prop({
      required: false,
      trim: true,
   })
   link: string;

   @Prop({
      required: false,
      trim: true,
   })
   decorType: string;

   @Prop({
      default: null,
   })
   deletedAt: Date;

   @Prop()
   createdAt: Date;

   @Prop()
   updatedAt: Date;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
CommunitySchema.methods.thumbnail = function (): any {
   return {
      collection: 'community',
      method: 'inside',
      fields: {
         image: {},
         imageMb: {},
      },
   };
};
