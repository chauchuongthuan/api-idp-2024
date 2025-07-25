import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DateTime } from '@core/constants/dateTime.enum';
const moment = require('moment');

@Injectable({ scope: Scope.REQUEST })
export class TransformerCoreMemberService {
   constructor(
      @Inject(REQUEST) private request: any, // private readonly transformerRole: TransformerRoleService,
   ) {}

   transformCoreMemberList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}) {
      const self = this;
      if (docs.docs) {
         docs.docs = docs.docs.map(function (doc) {
            return self.transformCoreMemberDetail(doc, appendDetailData, isTranslate);
         });
         return {
            ...docs,
            ...appendListData,
         };
      } else {
         docs = docs.map(function (doc) {
            return self.transformCoreMemberDetail(doc, appendDetailData, isTranslate);
         });
         return docs;
      }
   }

   transformCoreMemberDetail(doc, appendData = {}, isTranslate = false) {
      if (!doc || doc == doc._id) return doc;
      return {
         id: doc._id,
         image: doc.image ? doc.thumb('image') : null,
         image2: doc.image2 ? doc.thumb('image2') : null,
         banner: doc.banner ? doc.thumb('banner') : null,
         bannerMb: doc.bannerMb ? doc.thumb('bannerMb') : null,
         name: doc.name,
         name_en: doc.name_en,
         nameNon: doc.nameNon,
         nameNon_en: doc.nameNon_en,
         position: doc.position,
         position_en: doc.position_en,
         titleBanner: doc.titleBanner,
         titleBanner_en: doc.titleBanner_en,
         subTitleBanner: doc.subTitleBanner,
         subTitleBanner_en: doc.subTitleBanner_en,
         descriptionBanner: doc.descriptionBanner,
         descriptionBanner_en: doc.descriptionBanner_en,
         titleIntro: doc.titleIntro,
         titleIntro_en: doc.titleIntro_en,
         descriptionIntro: doc.descriptionIntro,
         descriptionIntro_en: doc.descriptionIntro_en,
         titleSection1: doc.titleSection1,
         titleSection1_en: doc.titleSection1_en,
         descriptionSection1: doc.descriptionSection1,
         descriptionSection1_en: doc.descriptionSection1_en,
         link: doc.link,
         titleSection2: doc.titleSection2,
         titleSection2_en: doc.titleSection2_en,
         descriptionSection2: doc.descriptionSection2,
         descriptionSection2_en: doc.descriptionSection2_en,
         slug: doc.slug,
         deletedAt: doc.deletedAt ? doc.deletedAt : null,
         createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
         updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
         ...appendData,
      };
   }

   transformCoreMemberExport(docs, appendData = {}, fileName?: string, customHeaders?: Array<string>) {
      return {
         excel: {
            name: fileName || `CoreMember-${moment().format('YYYY-MM-DD')}`,
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
