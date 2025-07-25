import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import  from 'mongoose';
import { isIn, isNotEmpty } from 'class-validator';
import { PaginateModel } from 'mongoose';
import { HelperService } from '@core/services/helper.service';
import { convertContentFileDto, deleteSpecifyFile, saveFileContent, saveThumbOrPhotos } from '@core/helpers/content';
import { Job } from '@src/schemas/job/job.schema';
import { JobTagService } from '@src/common/jobTag/services/jobTag.service';
import { BeJobDto } from '../dto/beJob.dto';
import { Department } from '@src/schemas/department/department.schema';
import { JobTag } from '@src/schemas/jobTag/jobTag.schema';
import { Workplace } from '@src/schemas/workplace/workplace.schema';
import { Experience } from '@src/schemas/experience/experience.schema';
import { Qualification } from '@src/schemas/qualification/qualification.schema';
import { PositionLevel } from '@src/schemas/positionLevel/positionLevel.schema';
import { Employment } from '@src/schemas/employment/employment.schema';
import { Salary } from '@src/schemas/salary/salary.schema';
const moment = require('moment');
@Injectable()
export class JobService {
   constructor(
      @InjectModel(Job.name) private job: PaginateModel<Job>,
      @InjectModel(Department.name) private department: PaginateModel<Department>,
      @InjectModel(JobTag.name) private jobTag: PaginateModel<JobTag>,
      @InjectModel(Workplace.name) private workplace: PaginateModel<Workplace>,
      @InjectModel(Experience.name) private experience: PaginateModel<Experience>,
      @InjectModel(Qualification.name) private qualification: PaginateModel<Experience>,
      @InjectModel(PositionLevel.name) private positionLevel: PaginateModel<PositionLevel>,
      @InjectModel(Employment.name) private employment: PaginateModel<Employment>,
      @InjectModel(Salary.name) private salary: PaginateModel<Employment>,
      private helper: HelperService,
      private jobTagService: JobTagService,
   ) {}
   async findAll(query: Record<string, any>): Promise<any> {
      const conditions = {};
      conditions['deletedAt'] = null;
      const sort = Object();
      sort[query.orderBy] = query.order;

      const projection = {};

      if (isNotEmpty(query.selects)) {
         query.selects.split(',').forEach((select) => {
            projection[select] = 1;
         });
      }

      if (isNotEmpty(query.name)) {
         const nameNon = await this.helper.nonAccentVietnamese(query.name);
         conditions[`nameNon`] = {
            $regex: new RegExp(nameNon, 'img'),
         };
      }
      if (isNotEmpty(query.department)) {
         conditions['department'] = query.department;
      }
      if (isNotEmpty(query.workplace)) {
         conditions['workplace'] = query.workplace;
      }
      if (isNotEmpty(query.positionLevel)) {
         conditions['positionLevel'] = query.positionLevel;
      }
      if (isNotEmpty(query.experience)) {
         conditions['experience'] = query.experience;
      }
      if (isNotEmpty(query.employment)) {
         conditions['employment'] = query.employment;
      }
      if (isNotEmpty(query.qualification)) {
         conditions['qualification'] = query.qualification;
      }
      if (isNotEmpty(query.salary)) {
         conditions['salary'] = query.salary;
      }

      if (isNotEmpty(query.idNotIn)) {
         conditions['_id'] = {
            $nin: query.idNotIn,
         };
      }

      if (isNotEmpty(query.idIn)) {
         conditions['_id'] = {
            $in: query.idIn,
         };
      }

      if (isNotEmpty(query.createdFrom) || isNotEmpty(query.createdTo)) {
         const createdFrom = moment(query.createdFrom || '1000-01-01').startOf('day');
         const createdTo = moment(query.createdTo || '3000-01-01').endOf('day');
         conditions[`createdAt`] = {
            $gte: createdFrom,
            $lte: createdTo,
         };
      }

      if (isNotEmpty(query.get)) {
         const get = parseInt(query.get);
         const result = this.job.find(conditions).sort(sort).select(projection);
         return isNaN(get) ? result : result.limit(get);
      } else {
         return this.job.paginate(conditions, {
            populate: [
               'department',
               'occupation',
               'workplace',
               'positionLevel',
               'salary',
               'employment',
               'qualification',
               'experience',
               'jobTag',
            ],
            select: projection,
            page: query.page,
            limit: query.limit,
            sort: sort,
         });
      }
   }
   async findAllFrondEnd(query: Record<string, any>): Promise<any> {
      const conditions = {};
      conditions['deletedAt'] = null;
      const sort = Object();
      sort[query.orderBy] = query.order;

      const projection = {};

      if (isNotEmpty(query.selects)) {
         query.selects.split(',').forEach((select) => {
            projection[select] = 1;
         });
      }
      if (isNotEmpty(query.name)) {
         const nameNon = await this.helper.nonAccentVietnamese(query.name);
         conditions[`nameNon`] = {
            $regex: new RegExp(nameNon, 'img'),
         };
      }
      if (isNotEmpty(query.department)) {
         // const department = await this.department.findOne({ slug: query.department });
         // if (department) {
         //    const departmentId = department?._id || department?.id;
         //    conditions['department'] = departmentId;
         // } else {
         //    return [];
         // }
         conditions['department'] = query.department;
      }
      if (isNotEmpty(query.workplace)) {
         conditions['workplace'] = query.workplace;
      }
      if (isNotEmpty(query.positionLevel)) {
         conditions['positionLevel'] = query.positionLevel;
      }
      if (isNotEmpty(query.experience)) {
         conditions['experience'] = query.experience;
      }
      if (isNotEmpty(query.employment)) {
         conditions['employment'] = query.employment;
      }
      if (isNotEmpty(query.qualification)) {
         conditions['qualification'] = query.qualification;
      }
      if (isNotEmpty(query.salary)) {
         conditions['salary'] = query.salary;
      }

      if (isNotEmpty(query.idNotIn)) {
         conditions['_id'] = {
            $nin: query.idNotIn,
         };
      }

      if (isNotEmpty(query.idIn)) {
         conditions['_id'] = {
            $in: query.idIn,
         };
      }

      if (isNotEmpty(query.createdFrom) || isNotEmpty(query.createdTo)) {
         const createdFrom = moment(query.createdFrom || '1000-01-01').startOf('day');
         const createdTo = moment(query.createdTo || '3000-01-01').endOf('day');
         conditions[`createdAt`] = {
            $gte: createdFrom,
            $lte: createdTo,
         };
      }

      if (isNotEmpty(query.get)) {
         const get = parseInt(query.get);
         const result = this.job.find(conditions).sort(sort).select(projection);
         return isNaN(get) ? result : result.limit(get);
      } else {
         return this.job.paginate(conditions, {
            populate: [
               'department',
               'occupation',
               'workplace',
               'positionLevel',
               'salary',
               'employment',
               'qualification',
               'experience',
               'jobTag',
            ],
            select: projection,
            page: query.page,
            limit: query.limit,
            sort: sort,
         });
      }
   }

   async findOne(query: Record<string, any>): Promise<Job> {
      return this.job
         .findOne(query)
         .populate('department')
         .populate('occupation')
         .populate('workplace')
         .populate('positionLevel')
         .populate('salary')
         .populate('employment')
         .populate('qualification')
         .populate('experience')
         .populate('jobTag');
   }

   async create(data: BeJobDto, files?: Array<any>): Promise<Job> {
      try {
         const self = this;
         const jobTagIds = [];

         // await convertContentFileDto(data, files, ['image', 'imageMb', 'galleries']);
         data.imageRms = [...new Set(data.imageRms)];

         files.forEach((file) => {
            let fields = file.fieldname.replaceAll('[', ' ').replaceAll(']', '').split(' ');
            fields = fields.filter((field) => isNotEmpty(field));
            this.assignStringFieldToObject(data, fields, file.filename);
         });
         const nameNon = await this.helper.nonAccentVietnamese(data['name']);
         data['nameNon'] = nameNon;
         const nameNon_en = await this.helper.nonAccentVietnamese(data['name_en']);
         data['nameNon_en'] = nameNon_en;
         if (typeof data['jobTag'] != 'undefined') {
            await Promise.all(
               data['jobTag'].map(async function (name, index) {
                  if (!name) return;
                  const nameNon = self.helper.removeSignVietnamese(name);
                  const nameNon_en = self.helper.removeSignVietnamese(name);
                  const name_en = name;
                  const resultTag = await self.jobTagService.createOnce({ name }, { name, nameNon, name_en, nameNon_en });
                  jobTagIds.push(resultTag.id);
               }),
            );
            data['jobTag'] = jobTagIds;
         }
         const item = await new this.job(data).save();
         if (item) {
            try {
               await Promise.all([
                  saveThumbOrPhotos(item),
                  saveFileContent('content', item, 'jobs', true),
                  // deleteSpecifyFile(data.imageRms, `jobs/${id}/content`),
               ]);
            } catch (error) {
               console.log(error);
            }
         }
         return item;
      } catch (error) {
         if (error.code === 11000) {
            throw new HttpException('Slug đã tồn tại', HttpStatus.BAD_REQUEST);
         }
      }
   }

   assignStringFieldToObject(data: any, fields: Array<any>, value: any) {
      if (fields.length == 1) {
         data[fields[0]] = value;
      } else {
         const field = fields.shift();
         this.assignStringFieldToObject(data[field], fields, value);
      }
   }

   async update(id: string, data: BeJobDto, files?: Array<any>): Promise<Job> {
      const exist = await this.job.findOne({ slug: data['slug'], _id: { $ne: id } });
      if (exist) {
         this.helper.throwException('Slug đã tồn tại');
         return;
      }
      data.imageRms = [...new Set(data.imageRms)];

      files.forEach((file) => {
         let fields = file.fieldname.replaceAll('[', ' ').replaceAll(']', '').split(' ');
         fields = fields.filter((field) => isNotEmpty(field));
         this.assignStringFieldToObject(data, fields, file.filename);
      });
      const self = this;
      const jobTagIds = [];
      const nameNon = await this.helper.nonAccentVietnamese(data['name']);
      data['nameNon'] = nameNon;
      const nameNon_en = await this.helper.nonAccentVietnamese(data['name_en']);
      data['nameNon_en'] = nameNon_en;
      if (typeof data['jobTag'] != 'undefined') {
         await Promise.all(
            data['jobTag'].map(async function (name, index) {
               if (!name) return;
               const nameNon = self.helper.removeSignVietnamese(name);
               const nameNon_en = self.helper.removeSignVietnamese(name);
               const name_en = name;
               const resultTag = await self.jobTagService.createOnce({ name }, { name, nameNon, name_en, nameNon_en });
               jobTagIds.push(resultTag.id);
            }),
         );
         data['jobTag'] = jobTagIds;
      }
      const item = await this.job.findByIdAndUpdate(id, data, { returnOriginal: false });
      if (item) {
         try {
            await Promise.all([
               saveThumbOrPhotos(item),
               saveFileContent('content', item, 'jobs', true),
               deleteSpecifyFile(data.imageRms, `jobs/${id}/content`),
            ]);
         } catch (error) {
            console.log(error);
         }
      }
      return item;
   }

   async deletes(ids: Array<string>): Promise<any> {
      const now = Date.now();
      const date = new Date();

      const set = {};
      set['slug'] = { $concat: ['$slug', `-DELETED-${now}`] };
      set['deletedAt'] = date;
      const updateData = [
         {
            $set: set,
         },
      ];

      for (const id of ids) {
         const result = await this.job.findOneAndUpdate({ _id: id, deletedAt: null }, updateData, { new: true });
      }
      return true;
   }

   async detail(id: string): Promise<Job> {
      const item = await this.job
         .findById(id)
         .populate('department')
         .populate('occupation')
         .populate('workplace')
         .populate('positionLevel')
         .populate('salary')
         .populate('employment')
         .populate('qualification')
         .populate('experience')
         .populate('jobTag');
      await saveFileContent('content', item, 'jobs', false);
      return item;
   }
   async findBySlug(query: Record<string, any>, slug: string): Promise<Job> {
      const conditions = {};
      conditions[`slug`] = slug;
      conditions[`deletedAt`] = null;
      const item = await this.job
         .findOne(conditions)
         .populate('department')
         .populate('occupation')
         .populate('workplace')
         .populate('positionLevel')
         .populate('salary')
         .populate('employment')
         .populate('qualification')
         .populate('experience')
         .populate('jobTag')
         .exec();
      await saveFileContent('content', item, 'jobs', false);
      return item;
   }
}
