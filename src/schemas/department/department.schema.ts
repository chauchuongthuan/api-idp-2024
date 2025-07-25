import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
@Schema({
   timestamps: true,
   collection: 'department',
})
export class Department extends Document implements TimestampInterface {
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

   // @Prop({
   //    required: true,
   //    trim: true,
   // })
   // slug: string;

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
      trim: true,
      default: 0,
      required: false,
   })
   sortOrder: number;

   // @Prop({
   //    required: false,
   //    trim: true,
   // })
   // link: string;

   @Prop({
      default: null,
   })
   deletedAt: Date;

   @Prop()
   createdAt: Date;

   @Prop()
   updatedAt: Date;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
DepartmentSchema.methods.thumbnail = function (): any {
   return {
      collection: 'department',
      method: 'inside',
      fields: {
         image: {},
         imageMb: {},
      },
   };
};
