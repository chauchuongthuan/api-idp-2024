import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
@Schema({
   timestamps: true,
   collection: 'contactWebsites',
})
export class ContactWebsite extends Document implements TimestampInterface {
   @Prop({
      required: true,
      trim: true,
   })
   name: string;

   @Prop({
      required: true,
      trim: true,
   })
   email: string;

   @Prop({
      required: true,
      trim: true,
   })
   phone: string;

   @Prop({
      required: false,
      trim: true,
   })
   question: string;

   // @Prop({
   //    required: true,
   //    trim: true,
   //    default: 1,
   // })
   // status: number;

   // @Prop({
   //    required: false,
   //    trim: true,
   // })
   // messageFile: string;

   @Prop({
      default: null,
   })
   deletedAt: Date;

   @Prop()
   createdAt: Date;

   @Prop()
   updatedAt: Date;
}

export const ContactWebsiteSchema = SchemaFactory.createForClass(ContactWebsite);
ContactWebsiteSchema.methods.thumbnail = function (): any {
   return {
      collection: 'contactWebsites',
      method: 'inside',
      fields: {
         // messageFile: {},
      },
   };
};
