import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
@Schema({
   timestamps: true,
   collection: 'categories',
})
export class Category extends Document implements TimestampInterface {
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
   parentId: any;

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

   // @Prop({
   //    required: false,
   //    trim: true,
   // })
   // thumbImage: string;

   @Prop({
      default: null,
   })
   deletedAt: Date;

   @Prop()
   createdAt: Date;

   @Prop()
   updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
