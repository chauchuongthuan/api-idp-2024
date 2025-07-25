import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
   timestamps: true,
   collection: 'tags',
})
export class Tag extends Document {
   @Prop({
      required: true,
      trim: true,
      unique: true,
   })
   name: string;

   @Prop({
      trim: true,
      default: null,
   })
   nameNon: string;

   @Prop({
      required: true,
      trim: true,
      unique: true,
   })
   name_en: string;

   @Prop({
      trim: true,
      default: null,
   })
   nameNon_en: string;

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

   @Prop({
      required: true,
      default: Date.now,
   })
   createdAt: Date;

   @Prop({
      required: true,
      default: Date.now,
   })
   updatedAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.post('save', function (error, doc, next) {
   if (error.name === 'MongoError' && error.code === 11000) {
      const fieldName = error.errmsg.substring(error.errmsg.indexOf('index: ') + 7, error.errmsg.indexOf('_1'));
      let msg = '';
      if (fieldName == 'name') {
         msg = 'Name đã được đăng ký';
      } else if (fieldName == 'slug') {
         msg = 'Slug đã được đăng ký';
      }
      next(new Error(msg));
   } else {
      next(error);
   }
});

TagSchema.methods.nonSignFields = function (): any {
   return {
      name: true,
   };
};
