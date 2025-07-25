import { TransformerCategoryService } from '@src/common/category/services/transformerCategory.service';
import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DateTime } from '@core/constants/dateTime.enum';
const moment = require('moment');

@Injectable({ scope: Scope.REQUEST })
export class TransformerInvesterService {
   private locale;

   constructor(
      @Inject(REQUEST) private request: any, // private readonly transformerRole: TransformerRoleService,
      private transformerCategory: TransformerCategoryService,
   ) {
      this.locale = this.request.locale;
   }

   transformInvesterList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}) {
      const self = this;
      if (docs.docs) {
         docs.docs = docs.docs.map(function (doc) {
            return self.transformInvesterDetail(doc, appendDetailData, isTranslate);
         });
         return {
            ...docs,
            ...appendListData,
         };
      } else {
         docs = docs.map(function (doc) {
            return self.transformInvesterDetail(doc, appendDetailData, isTranslate);
         });
         return docs;
      }
   }

   transformInvesterDetail(doc, appendData = {}, isTranslate = false) {
      const locale = this.locale;
      const mustTranslate = locale && isTranslate;
      if (!doc || doc == doc._id) return doc;
      return {
         id: doc.id || doc._id,
         title: doc.title,
         titleNon: doc.titleNon,
         title_en: doc.title_en,
         titleNon_en: doc.titleNon_en,
         slug: doc.slug,
         active: doc.active,
         category: doc.category ? this.transformerCategory.transformCategoryDetail(doc.category) : undefined,
         publishedAt: doc.publishedAt ? moment(doc.publishedAt).format(DateTime.CREATED_AT) : undefined,
         file: doc?.file ? doc?.thumb('file') : undefined,
         createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
         ...appendData,
      };
   }
}
