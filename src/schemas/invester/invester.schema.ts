import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Category } from '../category/category.schema';
@Schema({
   timestamps: true,
   collection: 'investers',
})
export class Invester extends Document implements TimestampInterface {
   @Prop({
      default: null,
   })
   file: string;

   @Prop({
      required: true,
      trim: true,
   })
   title: string;

   @Prop({
      required: true,
      trim: true,
      unique: true,
   })
   slug: string;

   @Prop({
      trim: true,
      default: null,
   })
   titleNon: string;

   @Prop({
      required: true,
      trim: true,
   })
   title_en: string;

   @Prop({
      trim: true,
      default: null,
   })
   titleNon_en: string;

   @Prop({
      index: true,
      type: SchemaTypes.ObjectId,
      ref: Category.name,
   })
   category: any;

   // @Prop({
   //    required: false,
   //    trim: true,
   //    default: 1,
   // })
   // sortOrder: string;

   @Prop({
      required: true,
      trim: true,
      default: false,
   })
   active: boolean;

   @Prop({
      nullable: true,
      default: null,
      index: true,
   })
   publishedAt: Date;

   @Prop({
      default: null,
   })
   deletedAt: Date;

   @Prop()
   createdAt: Date;

   @Prop()
   updatedAt: Date;
}

export const InvesterSchema = SchemaFactory.createForClass(Invester);

InvesterSchema.methods.thumbnail = function (field: string, type: string): object {
   return {
      collection: 'investor',
      method: 'inside',
      fields: {
         file: {},
      },
   };
};
