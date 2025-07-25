import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import  from 'mongoose';
import { isIn, isNotEmpty } from 'class-validator';
import { PaginateModel } from 'mongoose';
import { HelperService } from '@core/services/helper.service';
import { Customer } from '@schemas/customer/customer.schemas';
import { convertContentFileDto, saveThumbOrPhotos } from '@core/helpers/content';
import { Invester } from '@src/schemas/invester/invester.schema';
import { Category } from '@src/schemas/category/category.schema';
const moment = require('moment');
@Injectable()
export class InvesterService {
   constructor(
      @InjectModel(Invester.name) private invester: PaginateModel<Invester>,
      private helper: HelperService,
      @InjectModel(Category.name) private category: PaginateModel<Category>,
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

      if (isNotEmpty(query.category)) {
         conditions[`category`] = {
            $eq: query.category,
         };
      }

      if (isNotEmpty(query.title)) {
         const title = await this.helper.nonAccentVietnamese(query.title);
         conditions[`titleNon`] = {
            $regex: new RegExp(title, 'img'),
         };
      }

      if (isNotEmpty(query.title_en)) {
         const title_en = await this.helper.nonAccentVietnamese(query.title_en);
         conditions[`titleNon_en`] = {
            $regex: new RegExp(title_en, 'img'),
         };
      }

      if (['true', 'false', true, false].includes(query.active)) {
         conditions['active'] = query.active;
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
      if (isNotEmpty(query.publishedAt)) {
         const publishedFrom = moment(query.publishedAt).startOf('year');
         const publishedTo = moment(query.publishedAt).endOf('year');
         conditions[`publishedAt`] = {
            $gte: publishedFrom,
            $lte: publishedTo,
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
         const result = this.invester.find(conditions).sort(sort).select(projection);
         return isNaN(get) ? result : result.limit(get);
      } else {
         return this.invester.paginate(conditions, {
            select: projection,
            page: query.page,
            limit: query.limit,
            sort: sort,
            populate: ['category'],
         });
      }
   }

   async findAllFrontend(query: Record<string, any>): Promise<any> {
      const conditions = {};
      conditions['deletedAt'] = null;
      conditions['active'] = true;
      const sort = Object();
      sort[query.orderBy] = query.order;

      const projection = {};

      if (isNotEmpty(query.selects)) {
         query.selects.split(',').forEach((select) => {
            projection[select] = 1;
         });
      }

      if (isNotEmpty(query.title)) {
         const title = await this.helper.nonAccentVietnamese(query.title);
         conditions[`titleNon`] = {
            $regex: new RegExp(title, 'img'),
         };
      }

      if (isNotEmpty(query.category)) {
         const listCategoryConditions = [];
         const category = await this.category.findOne({ slug: query.category }).exec();
         if (!category) {
            return [];
         }
         listCategoryConditions.push(category._id);
         if (!category?.parentId) {
            const categoryChildren = await this.category.find({ parentId: category._id }).exec();
            categoryChildren.forEach((item) => {
               listCategoryConditions.push(item._id);
            });
         }
         conditions[`category`] = {
            $in: listCategoryConditions,
         };
      }

      if (isNotEmpty(query.title)) {
         const title = await this.helper.nonAccentVietnamese(query.title);
         conditions[`titleNon`] = {
            $regex: new RegExp(title, 'img'),
         };
      }

      if (isNotEmpty(query.title_en)) {
         const title_en = await this.helper.nonAccentVietnamese(query.title_en);
         conditions[`titleNon_en`] = {
            $regex: new RegExp(title_en, 'img'),
         };
      }

      if (['true', 'false', true, false].includes(query.active)) {
         conditions['active'] = query.active;
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
      if (isNotEmpty(query.publishedAt)) {
         const publishedFrom = moment(query.publishedAt).startOf('year');
         const publishedTo = moment(query.publishedAt).endOf('year');
         conditions[`publishedAt`] = {
            $gte: publishedFrom,
            $lte: publishedTo,
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
         const result = this.invester.find(conditions).sort(sort).select(projection);
         return isNaN(get) ? result : result.limit(get);
      } else {
         return this.invester.paginate(conditions, {
            select: projection,
            page: query.page,
            limit: query.limit,
            sort: sort,
            populate: ['category'],
         });
      }
   }
   async findOne(query: Record<string, any>): Promise<Invester> {
      return this.invester.findOne(query).populate('category');
   }

   async generateRandomCode(length = 5): Promise<string> {
      let code = '';
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
         code += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return code;
   }

   async create(data: object, files: Record<any, any>): Promise<Invester> {
      try {
         const titleNon = await this.helper.nonAccentVietnamese(data['title']);
         data['titleNon'] = titleNon;
         const titleNon_en = await this.helper.nonAccentVietnamese(data['title_en']);
         data['titleNon_en'] = titleNon_en;
         await convertContentFileDto(data, files, ['file']);
         const randomCode = await this.generateRandomCode();
         data['slug'] = data['slug'] + '-' + randomCode;
         const item = await new this.invester(data).save();
         if (item) {
            await saveThumbOrPhotos(item);
            const updateSlug = item.slug + '-' + item.id;
            console.log('updateSlug::', updateSlug);
            await this.invester.findByIdAndUpdate(item.id, { slug: updateSlug }, { returnOriginal: false });
         }
         return item;
      } catch (error) {
         if (error.code === 11000) {
            throw new HttpException('Slug đã tồn tại', HttpStatus.BAD_REQUEST);
         }
      }
   }

   async update(id: string, data: object, files: Record<any, any>): Promise<Invester> {
      console.log('run log update invester');
      const titleNon = await this.helper.nonAccentVietnamese(data['title']);
      data['titleNon'] = titleNon;
      const titleNon_en = await this.helper.nonAccentVietnamese(data['title_en']);
      data['titleNon_en'] = titleNon_en;
      if (!data['slug'].includes(`-${id}`)) {
         data['slug'] = data['slug'] + '-' + id;
      }
      await convertContentFileDto(data, files, ['file']);
      const item = await this.invester.findByIdAndUpdate(id, data, { returnOriginal: false });
      if (item) await saveThumbOrPhotos(item);
      return item;
   }

   async deletes(ids: Array<string>): Promise<any> {
      const self = this;
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
         const result = await this.invester.findOneAndUpdate({ _id: id, deletedAt: null }, updateData, { new: true });
      }
      return true;
   }

   async detail(id: string): Promise<Invester> {
      return this.invester.findById(id).populate('category');
   }
   async findById(query: Record<string, any>, id: string): Promise<Invester> {
      const conditions = {};
      conditions['_id'] = id;

      return this.invester.findOne(conditions).populate('category').exec();
   }

   // async findBySlug(query: Record<string, any>, slug: string): Promise<Invester> {
   //    const conditions = {};
   //    conditions[`slug`] = slug;
   //    conditions[`active`] = true;
   //    conditions[`deletedAt`] = null;
   //    return this.invester.findOne(conditions).populate('category').exec();
   // }
}
