import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Department } from '../department/department.schema';
import { Workplace } from '../workplace/workplace.schema';
import { PositionLevel } from '../positionLevel/positionLevel.schema';
import { Employment } from '../employment/employment.schema';
import { Qualification } from '../qualification/qualification.schema';
import { Experience } from '../experience/experience.schema';
import { Salary } from '../salary/salary.schema';
import { JobTag } from '../jobTag/jobTag.schema';
import { Occupation } from '../occupation/occupation.schema';
@Schema({
   timestamps: true,
   collection: 'jobs',
})
export class Job extends Document implements TimestampInterface {
   @Prop({
      default: null,
   })
   image: string;

   @Prop({
      default: null,
   })
   imageMb: string;

   @Prop({
      default: null,
   })
   thumbImage: string;

   @Prop({
      default: null,
   })
   thumbImageMb: string;

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
      default: 1,
   })
   quantity: number;

   @Prop({
      nullable: true,
      default: null,
      index: true,
   })
   deadline: Date;

   @Prop({
      required: true,
      trim: true,
      unique: true,
   })
   slug: string;

   @Prop({
      index: true,
      type: SchemaTypes.ObjectId,
      ref: Department.name,
   })
   department: any;

   @Prop({
      index: true,
      type: SchemaTypes.ObjectId,
      ref: Occupation.name,
   })
   occupation: any;

   @Prop({
      index: true,
      type: SchemaTypes.ObjectId,
      ref: Workplace.name,
   })
   workplace: any;

   @Prop({
      index: true,
      type: SchemaTypes.ObjectId,
      ref: PositionLevel.name,
   })
   positionLevel: any;

   @Prop({
      index: true,
      type: SchemaTypes.ObjectId,
      ref: Employment.name,
   })
   employment: any;

   @Prop({
      index: true,
      type: SchemaTypes.ObjectId,
      ref: Qualification.name,
   })
   qualification: any;

   @Prop({
      index: true,
      type: SchemaTypes.ObjectId,
      ref: Experience.name,
   })
   experience: any;

   @Prop({
      index: true,
      type: SchemaTypes.ObjectId,
      ref: Salary.name,
   })
   salary: any;

   @Prop([
      {
         type: SchemaTypes.ObjectId,
         ref: JobTag.name,
      },
   ])
   jobTag: Array<any>;

   @Prop({ type: Object })
   content: object;

   @Prop({
      default: null,
   })
   deletedAt: Date;

   @Prop()
   createdAt: Date;

   @Prop()
   updatedAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
JobSchema.methods.thumbnail = function (): any {
   return {
      collection: 'jobs',
      method: 'inside',
      fields: {
         image: {},
         imageMb: {},
         thumbImage: {},
         thumbImageMb: {},
      },
   };
};
// JobSchema.methods.thumbPhotos = function (field: string, type: string): object {
//    return {
//       collection: 'jobs',
//       method: 'inside',
//       fields: {
//          galleries: {},
//       },
//    };
// };
