import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import  from 'mongoose';
import { isIn, isNotEmpty } from 'class-validator';
import { PaginateModel } from 'mongoose';
import { HelperService } from '@core/services/helper.service';
import { Customer } from '@schemas/customer/customer.schemas';
import { convertContentFileDto, saveThumbOrPhotos } from '@core/helpers/content';
import { Application } from '@src/schemas/application/application.schema';
const moment = require('moment');
@Injectable()
export class ApplicationService {
   constructor(@InjectModel(Application.name) private application: PaginateModel<Application>) {}

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
         conditions['name'] = {
            $regex: new RegExp(query.name, 'img'),
         };
      }

      if (isNotEmpty(query.email)) {
         conditions['email'] = {
            $regex: new RegExp(query.email, 'img'),
         };
      }

      if (isNotEmpty(query.phone)) {
         conditions['phone'] = {
            $regex: new RegExp(query.phone, 'img'),
         };
      }

      if (isNotEmpty(query.job)) {
         conditions['job'] = query.job;
      }

      if (isNotEmpty(query.status)) {
         conditions['status'] = {
            $eq: query.status,
         };
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
         const result = this.application.find(conditions).sort(sort).select(projection).populate('job');
         return isNaN(get) ? result : result.limit(get);
      } else {
         return this.application.paginate(conditions, {
            select: projection,
            page: query.page,
            limit: query.limit,
            sort: sort,
            populate: ['job'],
         });
      }
   }

   async findOne(query: Record<string, any>): Promise<Application> {
      return this.application.findOne(query).populate('job');
   }

   async create(data: object, files?: Record<any, any>): Promise<Application> {
      await convertContentFileDto(data, files, ['file']);
      const item = await new this.application(data).save();
      if (item) await saveThumbOrPhotos(item);
      return item;
   }

   async update(id: string, data: object, files?: Record<any, any>): Promise<Application> {
      await convertContentFileDto(data, files, ['file']);
      const item = await this.application.findByIdAndUpdate(id, data, { returnOriginal: false });
      if (item) await saveThumbOrPhotos(item);
      return item;
   }

   async deletes(ids: Array<string>): Promise<any> {
      return this.application.deleteMany({ _id: { $in: ids } }, { deletedAt: new Date() });
   }

   async detail(id: string): Promise<Application> {
      return this.application.findById(id).populate('job');
   }
}
