import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { isNotEmpty, isIn } from 'class-validator';
import { Post } from '@schemas/posts/post.schemas';
import { StatusEnum } from '@core/constants/post.enum';
import { convertContentFileDto, deleteSpecifyFile, saveFileContent, saveThumbOrPhotos } from '@core/helpers/content';
import { TagService } from '@common/posts/services/tag.service';
import { HelperService } from '@core/services/helper.service';
import { UserService } from '@src/common/users/services/user.service';
import { TransformerPostService } from './transformerPost.service';
import { PostCategory } from '@src/schemas/posts/postCategory.schemas';
const moment = require('moment');
const sgMail = require('@sendgrid/mail');
@Injectable()
export class PostService {
   private locale;
   private user;
   // private role;
   private defaultStatus;

   constructor(
      @InjectModel(Post.name) private post: PaginateModel<Post>,
      @InjectModel(PostCategory.name) private category: PaginateModel<Post>,
      @Inject(REQUEST) private request: any,
      private tag: TagService,
      private userService: UserService,
      private helper: HelperService,
      private transformerPostService: TransformerPostService,
   ) {
      this.locale = this.request.locale == 'vi' ? 'viNon' : this.request.locale;
      this.user = this.request.user;
      // this.role = this.request.user.role;
      this.defaultStatus = StatusEnum.NEW;
   }

   async totalPost(): Promise<any> {
      return this.post.countDocuments();
   }

   async totalNewPost(): Promise<any> {
      return this.post.countDocuments({ status: StatusEnum.NEW });
   }

   async totalReviewPost(): Promise<any> {
      return this.post.countDocuments({ status: StatusEnum.IN_REVIEW });
   }

   async totalCensorshipPost(): Promise<any> {
      return this.post.countDocuments({ status: StatusEnum.CENSORSHIP });
   }

   async totalPublishedPost(): Promise<any> {
      return this.post.countDocuments({ status: StatusEnum.PUBLISHED });
   }

   async findAll(query: Record<string, any>): Promise<any> {
      const conditions = {};
      conditions['deletedAt'] = null;
      const sort = Object();
      // query.orderBy =
      //    ['title', 'shortDescription'].indexOf(query.orderBy) != -1 ? `${query.orderBy}.${this.locale}` : query.orderBy;
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

      if (isNotEmpty(query.postCategory)) {
         conditions[`postCategory`] = {
            $eq: query.postCategory,
         };
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

      if (isIn(query['feature'], ['true', 'false', true, false])) {
         conditions['feature'] = query['feature'];
      }

      if (isNotEmpty(query.publishedFrom) || isNotEmpty(query.publishedTo)) {
         const publishedFrom = moment(query.publishedFrom || '1000-01-01').startOf('day');
         const publishedTo = moment(query.publishedTo || '3000-01-01').endOf('day');
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
         const result = this.post
            .find(conditions)
            .sort(sort)
            .select(projection)
            .populate('tags')
            .populate('author')
            .populate('postCategory');
         return isNaN(get) ? result : result.limit(get);
      } else {
         return this.post.paginate(conditions, {
            select: projection,
            page: query.page,
            limit: query.limit,
            sort: sort,
            populate: ['tags', 'author', 'postCategory'],
         });
      }
   }

   async findAllFrontend(query: Record<string, any>): Promise<any> {
      const conditions = {};
      conditions['deletedAt'] = null;
      conditions['status'] = StatusEnum.PUBLISHED;
      conditions['publishedAt'] = { $lte: moment().format('YYYY-MM-DD HH:mm:ss') };
      const sort = Object();
      // query.orderBy =
      //    ['title', 'shortDescription'].indexOf(query.orderBy) != -1 ? `${query.orderBy}.${this.locale}` : query.orderBy;
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
      if (isNotEmpty(query.title_en)) {
         const title_en = await this.helper.nonAccentVietnamese(query.title_en);
         conditions[`titleNon_en`] = {
            $regex: new RegExp(title_en, 'img'),
         };
      }

      if (isNotEmpty(query.tagIdIn)) {
         conditions['tags'] = {
            $in: query.tagIdIn,
         };
      }

      if (isNotEmpty(query.postCategory)) {
         const postCategory = await this.category.findOne({ slug: query.postCategory });
         if (postCategory) {
            const categoryId = postCategory?._id || postCategory?.id;
            conditions['postCategory'] = categoryId;
         } else {
            return [];
         }
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

      if (isIn(query['feature'], ['true', 'false', true, false])) {
         conditions['feature'] = query['feature'];
      }

      if (isNotEmpty(query.createdFrom) || isNotEmpty(query.createdTo)) {
         const createdFrom = moment(query.createdFrom || '1000-01-01').startOf('day');
         const createdTo = moment(query.createdTo || '3000-01-01').endOf('day');
         conditions[`createdAt`] = {
            $gte: createdFrom,
            $lte: createdTo,
         };
      }
      // let hot;

      // if (query.page == 1) {
      //    const post = await this.post.findOne({ isHot: true, deletedAt: null }).populate(['tags']);
      //    if (post) hot = await this.transformerPostService.transformPostDetail(post);
      // }
      // console.log(`🚀hot----->`, hot);
      if (isNotEmpty(query.get)) {
         const get = parseInt(query.get);
         const result = this.post
            .find(conditions)
            .sort(sort)
            .select(projection)
            .populate('tags')
            .populate('author')
            .populate('postCategory');
         return isNaN(get) ? result : result.limit(get);
      } else {
         return this.post.paginate(conditions, {
            populate: query.populate || ['postCategory', 'tags', 'author'],
            select: projection,
            page: query.page,
            limit: query.limit,
            sort: sort,
         });
      }
   }

   async findById(id: string): Promise<Post | boolean> {
      const item = await this.post.findById(id).populate('tags').populate('postCategory').populate('author');

      return item;
   }

   async findBySlug(slug: string): Promise<any> {
      const conditions = {};
      conditions[`slug`] = slug;
      conditions[`status`] = StatusEnum.PUBLISHED;
      conditions['publishedAt'] = { $lte: moment().format('YYYY-MM-DD HH:mm:ss') };
      return await this.post.findOne(conditions).populate('tags').populate('author').populate('postCategory');
   }

   async create(data: object, files: Record<any, any>): Promise<Post> {
      // if (!data['postCategory']) {
      //    const category = await this.postCategory.findOne({ deletedAt: null });
      //    data['postCategory'] = category._id;
      // }
      const titleNon = await this.helper.nonAccentVietnamese(data['title']);
      data['titleNon'] = titleNon;
      const titleNon_en = await this.helper.nonAccentVietnamese(data['title_en']);
      data['titleNon_en'] = titleNon_en;
      const exist = await this.post.findOne({ slug: data['slug'] });
      if (exist && exist.status !== 1) this.helper.throwException('Slug đã tồn tại');
      else if (exist) {
         return this.update(exist._id, data, files);
      }
      const self = this;
      const tagIds = [];

      await convertContentFileDto(data, files, ['image', 'imageMb', 'thumbImage', 'thumbImageMb', 'metaImage']);

      if (typeof data['tags'] != 'undefined') {
         await Promise.all(
            data['tags'].map(async function (name, index) {
               if (!name) return;
               const slug = self.helper.removeSignVietnameseSlug(name);
               const nameNon = self.helper.removeSignVietnamese(name);
               const resultTag = await self.tag.createOnce(
                  { name },
                  { name, slug, nameNon, active: true, name_en: nameNon, nameNon_en: nameNon },
               );
               tagIds.push(resultTag.id);
            }),
         );
         data['tags'] = tagIds;
      }
      data['view'] = 0;
      data['author'] = this.user._id;
      data['status'] = data['status'] || this.defaultStatus;
      const item = await new this.post(data).save();
      if (item) {
         await saveThumbOrPhotos(item);
      }
      return item;
   }

   async galleries(id: string, data: any, files: Record<any, any>): Promise<any> {
      files.forEach((file) => {
         let fields = file.fieldname.replaceAll('[', ' ').replaceAll(']', '').split(' ');
         fields = fields.filter((field) => isNotEmpty(field));
         this.assignStringFieldToObject(data, fields, file.filename);
      });

      const item = await this.post.findByIdAndUpdate(id, data, { new: true });

      if (item) {
         try {
            await Promise.all([saveThumbOrPhotos(item), saveFileContent('gallery', item, 'post', true)]);
         } catch (error) {
            console.log(error);
         }
      }
      return item;
   }

   assignStringFieldToObject(data: any, fields: Array<any>, value: any) {
      if (fields.length == 1) {
         data[fields[0]] = value;
         console.log('1', value);
         console.log('2', fields[0]);
      } else {
         const field = fields.shift();
         this.assignStringFieldToObject(data[field], fields, value);
      }
   }

   async update(id: string, data: object, files: Record<any, any>): Promise<any> {
      let item: any = await this.findById(id);
      if (!item) return false;
      const titleNon = await this.helper.nonAccentVietnamese(data['title']);
      data['titleNon'] = titleNon;
      const titleNon_en = await this.helper.nonAccentVietnamese(data['title_en']);
      data['titleNon_en'] = titleNon_en;
      await convertContentFileDto(data, files, ['image', 'imageMb', 'thumbImage', 'thumbImageMb', 'metaImage']);

      const self = this;
      const tagIds = [];

      if (typeof data['tags'] != 'undefined') {
         await Promise.all(
            data['tags'].map(async function (name, index) {
               if (!name) return;
               const slug = self.helper.removeSignVietnameseSlug(name);
               const nameNon = self.helper.removeSignVietnamese(name);
               const resultTag = await self.tag.createOnce(
                  { name },
                  { name, slug, nameNon, active: true, name_en: nameNon, nameNon_en: nameNon },
               );
               tagIds.push(resultTag.id);
            }),
         );
         data['tags'] = tagIds;
      }
      // data['publishedAt'] = data['publishedAt'] || moment().format('YYYY-MM-DD HH:mm:ss');
      data['lastEditor'] = this.user._id;

      const exist = await this.post.findOne({ slug: data['slug'], _id: { $ne: id } });
      if (exist && exist.status !== 1) {
         this.helper.throwException('Slug đã tồn tại');
         return;
      }
      item = await this.post.findByIdAndUpdate(id, data, { new: true });
      if (item) await saveThumbOrPhotos(item);
      return item;
   }

   async deleteManyById(ids: Array<string>): Promise<any> {
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
         const result = await this.post.findOneAndUpdate({ _id: id, deletedAt: null }, updateData, { new: true });
      }

      return true;
   }
   async changeStatus(data: any) {
      let item;
      if (data.status == StatusEnum.PUBLISHED) {
         item = await this.post.findByIdAndUpdate(
            data.id,
            { status: data.status, publishedAt: moment().format('YYYY-MM-DD HH:mm:ss') },
            { returnOriginal: false },
         );
      } else {
         item = await this.post.findByIdAndUpdate(data.id, { status: data.status }, { returnOriginal: false });
      }
      return item;
   }

   async sendMailSendGrid(data: any, message: string): Promise<boolean> {
      const mailTo = await Promise.all(
         data.assigned.map(async (element) => {
            const assigned = await this.userService.findOne({ _id: element });
            return assigned.email;
         }),
      );
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const email = process.env.SENDGRID_EMAIL_SEND;
      const msg = {
         to: mailTo,
         from: {
            email,
            name: process.env.SENDGRID_TEMPLATE_SEND_NAME,
         },
         templateId: process.env.SENDGRID_TEMPLATE_STATUS_TASK,
         dynamic_template_data: {
            title: data.title,
            message: message,
            link: process.env.LINK_CMS_POST,
         },
      };
      try {
         sgMail.send(msg);
      } catch (error) {
         console.log(error);

         if (error.response) {
            console.error(error.response.body);
         }
      }
      return true;
   }

   async updateView(postSlug: any) {
      const updateView = await this.post.updateOne({ slug: postSlug }, { $inc: { view: 1 } });
   }
}
