import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
@Schema({
   timestamps: true,
   collection: 'occupation',
})
export class Occupation extends Document implements TimestampInterface {
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
      default: null,
   })
   deletedAt: Date;

   @Prop()
   createdAt: Date;

   @Prop()
   updatedAt: Date;
}

export const OccupationSchema = SchemaFactory.createForClass(Occupation);
// OccupationSchema.methods.thumbnail = function (): any {
//    return {
//       collection: 'department',
//       method: 'inside',
//       fields: {
//          image: {},
//          imageMb: {},
//       },
//    };
// };
