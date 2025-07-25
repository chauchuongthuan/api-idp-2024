import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DateTime } from '@core/constants/dateTime.enum';
const moment = require('moment');

@Injectable({ scope: Scope.REQUEST })
export class TransformerCategoryService {
   private locale;

   constructor(
      @Inject(REQUEST) private request: any, // private readonly transformerRole: TransformerRoleService,
   ) {
      this.locale = this.request.locale;
   }

   transformCategoryList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}) {
      const self = this;
      if (docs.docs) {
         docs.docs = docs.docs.map(function (doc) {
            return self.transformCategoryDetail(doc, appendDetailData, isTranslate);
         });
         return {
            ...docs,
            ...appendListData,
         };
      } else {
         docs = docs.map(function (doc) {
            return self.transformCategoryDetail(doc, appendDetailData, isTranslate);
         });
         return docs;
      }
   }

   transformCategoryDetail(doc, appendData = {}, isTranslate = false) {
      const locale = this.locale;
      const mustTranslate = locale && isTranslate;
      if (!doc || doc == doc._id) return doc;
      return {
         id: doc.id || doc._id,
         title: doc.title,
         titleNon: doc.titleNon,
         slug: doc.slug,
         title_en: doc?.title_en,
         titleNon_en: doc?.titleNon_en,
         // parentId: doc?.parentId ? this.transformParentDetail(doc.parentId) : '',
         active: doc.active,
         // count: doc.count,
         children: doc?.children ? this.transformChildrenList(doc.children) : '',
         createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
         ...appendData,
      };
   }

   transformTreeList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}) {
      const self = this;
      if (docs.docs) {
         docs.docs = docs.docs.map(function (doc) {
            return self.transformTreeDetail(doc, appendDetailData, isTranslate);
         });
         return {
            ...docs,
            ...appendListData,
         };
      } else {
         docs = docs.map(function (doc) {
            return self.transformTreeDetail(doc, appendDetailData, isTranslate);
         });
         return docs;
      }
   }

   transformTreeDetail(doc, appendData = {}, isTranslate = false) {
      const locale = this.locale;
      const mustTranslate = locale && isTranslate;
      if (!doc || doc == doc._id) return doc;
      return {
         id: doc.id || doc._id,
         title: doc.title,
         titleNon: doc.titleNon,
         slug: doc.slug,
         title_en: doc?.title_en,
         titleNon_en: doc?.titleNon_en,
         // parentId: doc?.parentId ? this.transformParentDetail(doc.parentId) : '',
         active: doc.active,
         children: doc?.children ? this.transformChildrenList(doc.children) : '',
         createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
         ...appendData,
      };
   }

   transformParentDetail(doc, appendData = {}, isTranslate = false) {
      const locale = this.locale;
      const mustTranslate = locale && isTranslate;
      if (!doc || doc == doc._id) return doc;
      return {
         id: doc.id,
         title: doc.title,
         titleNon: doc.titleNon,
         slug: doc.slug,
         title_en: doc?.title_en,
         titleNon_en: doc?.titleNon_en,
         active: doc.active,
         childrent: doc?.childrent,
         createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
         ...appendData,
      };
   }

   transformChildrenList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}) {
      const self = this;
      if (docs.docs) {
         docs.docs = docs.docs.map(function (doc) {
            return self.transformChildrenDetail(doc, appendDetailData, isTranslate);
         });
         return {
            ...docs,
            ...appendListData,
         };
      } else {
         docs = docs.map(function (doc) {
            return self.transformChildrenDetail(doc, appendDetailData, isTranslate);
         });
         return docs;
      }
   }

   transformChildrenDetail(doc, appendData = {}, isTranslate = false) {
      const locale = this.locale;
      const mustTranslate = locale && isTranslate;
      if (!doc || doc == doc._id) return doc;
      return {
         id: doc.id || doc._id,
         title: doc.title,
         titleNon: doc.titleNon,
         slug: doc.slug,
         title_en: doc?.title_en,
         titleNon_en: doc?.titleNon_en,
         active: doc.active,
         sortOrder: doc.sortOrder,
         createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
         ...appendData,
      };
   }
}
