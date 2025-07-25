import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
@Schema({
   timestamps: true,
   collection: 'salary',
})
export class Salary extends Document implements TimestampInterface {
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

export const SalarySchema = SchemaFactory.createForClass(Salary);
// SalarySchema.methods.thumbnail = function (): any {
//    return {
//       collection: 'department',
//       method: 'inside',
//       fields: {
//          image: {},
//          imageMb: {},
//       },
//    };
// };
