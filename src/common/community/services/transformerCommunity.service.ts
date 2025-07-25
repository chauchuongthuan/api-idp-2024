import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DateTime } from '@core/constants/dateTime.enum';
const moment = require('moment');

@Injectable({ scope: Scope.REQUEST })
export class TransformerCommunityService {
   constructor(
      @Inject(REQUEST) private request: any, // private readonly transformerRole: TransformerRoleService,
   ) {}

   transformCommunityList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}) {
      const self = this;
      if (docs.docs) {
         docs.docs = docs.docs.map(function (doc) {
            return self.transformCommunityDetail(doc, appendDetailData, isTranslate);
         });
         return {
            ...docs,
            ...appendListData,
         };
      } else {
         docs = docs.map(function (doc) {
            return self.transformCommunityDetail(doc, appendDetailData, isTranslate);
         });
         return docs;
      }
   }

   transformCommunityDetail(doc, appendData = {}, isTranslate = false) {
      if (!doc || doc == doc._id) return doc;
      return {
         id: doc._id,
         name: doc.name,
         name_en: doc.name_en,
         description: doc.description,
         description_en: doc.description_en,
         shortDescription: doc.shortDescription,
         shortDescription_en: doc.shortDescription_en,
         slug: doc.slug,
         link: doc.link,
         decorType: doc.decorType,
         image: doc.image ? doc.thumb('image') : null,
         imageMb: doc.imageMb ? doc.thumb('imageMb') : null,
         deletedAt: doc.deletedAt ? doc.deletedAt : null,
         createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
         updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
         ...appendData,
      };
   }

   transformCommunityExport(docs, appendData = {}, fileName?: string, customHeaders?: Array<string>) {
      return {
         excel: {
            name: fileName || `Communities-${moment().format('YYYY-MM-DD')}`,
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
                          image: doc.image,
                          imageMb: doc.imageMb,
                          name: doc.name,
                          name_en: doc.name_en,
                          description: doc.description,
                          description_en: doc.description_en,
                          shortDescription: doc.shortDescription,
                          shortDescription_en: doc.shortDescription_en,
                          createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
                          updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
                       };
                    })
                  : [{}],
            customHeaders: customHeaders || [
               'ID',
               'Image',
               'Image MB',
               'Name',
               'Name En',
               'Description',
               'Description En',
               'Short Description',
               'Short Description En',
               'createdAt',
               'Date Modified',
            ],
         },
      };
   }
}
