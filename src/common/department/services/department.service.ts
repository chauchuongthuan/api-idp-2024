import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import  from 'mongoose';
import { isIn, isNotEmpty } from 'class-validator';
import { PaginateModel } from 'mongoose';
import { HelperService } from '@core/services/helper.service';
import { Customer } from '@schemas/customer/customer.schemas';
import { convertContentFileDto, saveThumbOrPhotos } from '@core/helpers/content';
import { Department } from '@src/schemas/department/department.schema';
const moment = require('moment');
@Injectable()
export class DepartmentService {
   constructor(@InjectModel(Department.name) private department: PaginateModel<Department>, private helper: HelperService) {}

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
         const result = this.department.find(conditions).sort(sort).select(projection);
         return isNaN(get) ? result : result.limit(get);
      } else {
         return this.department.paginate(conditions, {
            select: projection,
            page: query.page,
            limit: query.limit,
            sort: sort,
         });
      }
   }

   async findOne(query: Record<string, any>): Promise<Department> {
      return this.department.findOne(query);
   }

   async create(data: object, files?: Record<any, any>): Promise<Department> {
      await convertContentFileDto(data, files, ['image', 'imageMb']);
      const nameNon = await this.helper.nonAccentVietnamese(data['name']);
      data['nameNon'] = nameNon;
      const nameNon_en = await this.helper.nonAccentVietnamese(data['name_en']);
      data['nameNon_en'] = nameNon_en;
      const item = await new this.department(data).save();
      if (item) await saveThumbOrPhotos(item);
      return item;
   }

   async update(id: string, data: object, files?: Record<any, any>): Promise<Department> {
      await convertContentFileDto(data, files, ['image', 'imageMb']);
      const nameNon = await this.helper.nonAccentVietnamese(data['name']);
      data['nameNon'] = nameNon;
      const nameNon_en = await this.helper.nonAccentVietnamese(data['name_en']);
      data['nameNon_en'] = nameNon_en;
      const item = await this.department.findByIdAndUpdate(id, data, { returnOriginal: false });
      if (item) await saveThumbOrPhotos(item);
      return item;
   }

   async deletes(ids: Array<string>): Promise<any> {
      return this.department.deleteMany({ _id: { $in: ids } }, { deletedAt: new Date() });
   }

   async detail(id: string): Promise<Department> {
      return this.department.findById(id);
   }
   // async findBySlug(query: Record<string, any>, slug: string): Promise<Department> {
   //    const conditions = {};
   //    conditions[`slug`] = slug;
   //    conditions[`deletedAt`] = null;
   //    return this.department.findOne(conditions).exec();
   // }
}
