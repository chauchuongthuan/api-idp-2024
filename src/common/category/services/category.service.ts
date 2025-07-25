import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import  from 'mongoose';
import { isIn, isNotEmpty } from 'class-validator';
import { PaginateModel } from 'mongoose';
import { HelperService } from '@core/services/helper.service';
import { Customer } from '@schemas/customer/customer.schemas';
import { convertContentFileDto, saveThumbOrPhotos } from '@core/helpers/content';
import { Category } from '@src/schemas/category/category.schema';
const moment = require('moment');
@Injectable()
export class CategoryService {
   constructor(@InjectModel(Category.name) private category: PaginateModel<Category>, private helper: HelperService) {}

   async getTree(query: Record<string, any>): Promise<any> {
      const conditions: any = { deletedAt: null };
      const sort: any = {};

      if (query.orderBy) {
         sort[query.orderBy] = query.order;
      }

      if (query.title) {
         const titleNon = this.helper.nonAccentVietnamese(query.title);
         conditions['titleNon'] = { $regex: new RegExp(titleNon, 'img') };
      }

      if (query.title_en) {
         const titleNon_en = this.helper.nonAccentVietnamese(query.title_en);
         conditions['titleNon_en'] = { $regex: new RegExp(titleNon_en, 'img') };
      }

      if (['true', 'false', true, false].includes(query.active)) {
         conditions['active'] = query.active;
      }

      if (query.createdFrom || query.createdTo) {
         const createdFrom = moment(query.createdFrom || '1000-01-01').startOf('day');
         const createdTo = moment(query.createdTo || '3000-01-01').endOf('day');
         conditions['createdAt'] = { $gte: createdFrom, $lte: createdTo };
      }

      const mapChildren = (parents: any[], children: any[]) => {
         const childrenMap: { [key: string]: any[] } = {};
         children.forEach((child: any) => {
            const parentId = child?.parentId?._id;
            if (!childrenMap[parentId]) {
               childrenMap[parentId] = [];
            }
            childrenMap[parentId].push(child._doc);
         });

         return parents.map((parent: any) => {
            const parentId = parent._id.toString();
            return {
               ...parent._doc,
               children: childrenMap[parentId] || [],
            };
         });
      };

      if (isNotEmpty(query.get)) {
         const get = parseInt(query.get);
         const result = await this.category
            .find(conditions)
            .sort(sort)
            .select(['id', 'title', 'titleNon', 'slug', 'title_en', 'titleNon_en', 'active', 'children', 'createdAt', 'parentId'])
            .populate('parentId');
         const parents = result.filter((doc: any) => !doc.parentId);
         const children = await this.category
            .find({ parentId: { $ne: null }, deletedAt: null })
            .select(['id', 'title', 'titleNon', 'slug', 'title_en', 'titleNon_en', 'active', 'createdAt', 'parentId']);
         const mappedParents = mapChildren(parents, children);
         return isNaN(get) ? mappedParents : mappedParents.slice(0, get);
      } else {
         const options = {
            populate: ['parentId'],
            select: ['id', 'title', 'titleNon', 'slug', 'title_en', 'titleNon_en', 'active', 'children', 'createdAt', 'parentId'],
            page: query.page,
            limit: query.limit,
            sort: sort,
         };
         const conditionParent = {
            ...conditions,
            parentId: null,
            deletedAt: null,
         };
         const parents = await this.category.paginate(conditionParent, options);
         // const parents = result.docs.filter((doc: any) => !doc.parentId);
         const children = await this.category
            .find({ parentId: { $ne: null }, deletedAt: null })
            .select(['id', 'title', 'titleNon', 'slug', 'title_en', 'titleNon_en', 'active', 'createdAt', 'parentId']);
         const paginatedParents = mapChildren(parents?.docs, children);
         return {
            ...parents,
            docs: paginatedParents,
         };
      }
   }

   async getTreeFrontend(query: Record<string, any>): Promise<any> {
      const conditions: any = { deletedAt: null, active: true };
      const sort: any = {};

      if (query.orderBy) {
         sort[query.orderBy] = query.order;
      }

      if (query.title) {
         const titleNon = this.helper.nonAccentVietnamese(query.title);
         conditions['titleNon'] = { $regex: new RegExp(titleNon, 'img') };
      }

      if (query.title_en) {
         const titleNon_en = this.helper.nonAccentVietnamese(query.title_en);
         conditions['titleNon_en'] = { $regex: new RegExp(titleNon_en, 'img') };
      }

      if (['true', 'false', true, false].includes(query.active)) {
         conditions['active'] = query.active;
      }

      if (query.createdFrom || query.createdTo) {
         const createdFrom = moment(query.createdFrom || '1000-01-01').startOf('day');
         const createdTo = moment(query.createdTo || '3000-01-01').endOf('day');
         conditions['createdAt'] = { $gte: createdFrom, $lte: createdTo };
      }

      const mapChildren = (parents: any[], children: any[]) => {
         const childrenMap: { [key: string]: any[] } = {};
         children.forEach((child: any) => {
            const parentId = child?.parentId?._id;
            if (!childrenMap[parentId]) {
               childrenMap[parentId] = [];
            }
            childrenMap[parentId].push(child._doc);
         });

         return parents.map((parent: any) => {
            const parentId = parent._id.toString();
            return {
               ...parent._doc,
               children: childrenMap[parentId] || [],
            };
         });
      };

      if (isNotEmpty(query.get)) {
         const get = parseInt(query.get);
         const result = await this.category
            .find(conditions)
            .sort(sort)
            .select(['id', 'title', 'titleNon', 'slug', 'title_en', 'titleNon_en', 'active', 'children', 'createdAt', 'parentId'])
            .populate('parentId');
         const parents = result.filter((doc: any) => !doc.parentId);
         const children = await this.category
            .find({ parentId: { $ne: null }, deletedAt: null, active: true })
            .select(['id', 'title', 'titleNon', 'slug', 'title_en', 'titleNon_en', 'active', 'createdAt', 'parentId']);
         const mappedParents = mapChildren(parents, children);
         return isNaN(get) ? mappedParents : mappedParents.slice(0, get);
      } else {
         const options = {
            populate: ['parentId'],
            select: ['id', 'title', 'titleNon', 'slug', 'title_en', 'titleNon_en', 'active', 'children', 'createdAt', 'parentId'],
            page: query.page,
            limit: query.limit,
            sort: sort,
         };
         const conditionParent = {
            ...conditions,
            parentId: null,
            deletedAt: null,
            active: true,
         };
         const parents = await this.category.paginate(conditionParent, options);
         // const parents = result.docs.filter((doc: any) => !doc.parentId);
         const children = await this.category
            .find({ parentId: { $ne: null }, deletedAt: null, active: true })
            .select(['id', 'title', 'titleNon', 'slug', 'title_en', 'titleNon_en', 'active', 'createdAt', 'parentId']);
         const paginatedParents = mapChildren(parents?.docs, children);
         return {
            ...parents,
            docs: paginatedParents,
         };
      }
   }

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

      if (isNotEmpty(query.listParent)) {
         conditions['parentId'] = { $eq: null };
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
         const result = this.category.find(conditions).sort(sort).select(projection);
         return isNaN(get) ? result : result.limit(get);
      } else {
         return this.category.paginate(conditions, {
            select: projection,
            page: query.page,
            limit: query.limit,
            sort: sort,
         });
      }
   }

   async findOne(query: Record<string, any>): Promise<Category> {
      return this.category.findOne(query);
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

   async create(data: object): Promise<Category> {
      try {
         const titleNon = await this.helper.nonAccentVietnamese(data['title']);
         data['titleNon'] = titleNon;
         const titleNon_en = await this.helper.nonAccentVietnamese(data['title_en']);
         data['titleNon_en'] = titleNon_en;
         const randomCode = await this.generateRandomCode();
         data['slug'] = data['slug'] + '-' + randomCode;
         const item = await new this.category(data).save();
         if (item) {
            const updateSlug = item.slug + '-' + item.id;
            console.log('updateSlug::', updateSlug);
            await this.category.findByIdAndUpdate(item.id, { slug: updateSlug }, { returnOriginal: false });
         }
         return item;
      } catch (error) {
         if (error.code === 11000) {
            throw new HttpException('Slug đã tồn tại', HttpStatus.BAD_REQUEST);
         }
      }
   }

   async update(id: string, data: object): Promise<Category> {
      const titleNon = await this.helper.nonAccentVietnamese(data['title']);
      data['titleNon'] = titleNon;
      const titleNon_en = await this.helper.nonAccentVietnamese(data['title_en']);
      data['titleNon_en'] = titleNon_en;
      if (!data['slug'].includes(`-${id}`)) {
         data['slug'] = data['slug'] + '-' + id;
      }
      const item = await this.category.findByIdAndUpdate(id, data, { returnOriginal: false });
      return item;
   }

   async deletes(ids: Array<string>): Promise<any> {
      return this.category.updateMany({ _id: { $in: ids } }, { deletedAt: new Date() });
   }

   async detail(id: string): Promise<Category> {
      return this.category.findById(id);
   }
   async findById(query: Record<string, any>, id: string): Promise<Category> {
      const conditions = {};
      conditions['_id'] = id;

      return this.category.findOne(conditions).exec();
   }

   async findBySlug(query: Record<string, any>, slug: string): Promise<Category> {
      const conditions = {};
      conditions[`slug`] = slug;
      conditions[`active`] = true;
      conditions[`deletedAt`] = null;
      return this.category.findOne(conditions).exec();
   }
}
