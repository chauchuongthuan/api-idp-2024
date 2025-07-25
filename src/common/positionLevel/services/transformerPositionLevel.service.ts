import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DateTime } from '@core/constants/dateTime.enum';
const moment = require('moment');

@Injectable({ scope: Scope.REQUEST })
export class TransformerPositionLevelService {
   constructor(
      @Inject(REQUEST) private request: any, // private readonly transformerRole: TransformerRoleService,
   ) {}

   transformPositionLevelList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}) {
      const self = this;
      if (docs.docs) {
         docs.docs = docs.docs.map(function (doc) {
            return self.transformPositionLevelDetail(doc, appendDetailData, isTranslate);
         });
         return {
            ...docs,
            ...appendListData,
         };
      } else {
         docs = docs.map(function (doc) {
            return self.transformPositionLevelDetail(doc, appendDetailData, isTranslate);
         });
         return docs;
      }
   }

   transformPositionLevelDetail(doc, appendData = {}, isTranslate = false) {
      if (!doc || doc == doc._id) return doc;
      return {
         id: doc._id,
         name: doc.name,
         name_en: doc.name_en,
         // slug: doc.slug,
         deletedAt: doc.deletedAt ? doc.deletedAt : null,
         createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
         updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
         ...appendData,
      };
   }

   transformPositionLevelExport(docs, appendData = {}, fileName?: string, customHeaders?: Array<string>) {
      return {
         excel: {
            name: fileName || `PositionLevel-${moment().format('YYYY-MM-DD')}`,
            data:
               docs.length > 0
                  ? docs.map(function (doc) {
                       //   let messageFile = null;
                       //   if (doc.messageFile) {
                       //      doc.messageFile.includes('http') || doc.messageFile.includes('https')
                       //         ? (messageFile = doc.messageFile)
                       //         : (messageFile = doc.thumb('messageFile', 'FB'));
                       //   }
                       return {
                          id: `${doc._id}`,
                          name: doc.name,
                          name_en: doc.name_en,
                          createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
                          updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
                       };
                    })
                  : [{}],
            customHeaders: customHeaders || ['ID', 'Name', 'Name En', 'createdAt', 'Date Modified'],
         },
      };
   }
}
