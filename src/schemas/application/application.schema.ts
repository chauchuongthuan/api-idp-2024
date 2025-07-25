import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Job } from '../job/job.schema';
@Schema({
   timestamps: true,
   collection: 'applications',
})
export class Application extends Document implements TimestampInterface {
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
      required: true,
      trim: true,
   })
   birthdate: string;

   @Prop({
      index: true,
      type: SchemaTypes.ObjectId,
      ref: Job.name,
   })
   job: any;

   @Prop({
      required: true,
      trim: true,
   })
   file: string;

   @Prop({
      default: null,
   })
   deletedAt: Date;

   @Prop()
   createdAt: Date;

   @Prop()
   updatedAt: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
ApplicationSchema.methods.thumbnail = function (): any {
   return {
      collection: 'applications',
      method: 'inside',
      fields: {
         file: {},
      },
   };
};
