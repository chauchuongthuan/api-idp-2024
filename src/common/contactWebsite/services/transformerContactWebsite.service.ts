import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DateTime } from '@core/constants/dateTime.enum';
const moment = require('moment');

@Injectable({ scope: Scope.REQUEST })
export class TransformerContactWebsiteService {
   constructor(
      @Inject(REQUEST) private request: any, // private readonly transformerRole: TransformerRoleService,
   ) {}

   transformContactWebsiteList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}) {
      const self = this;
      if (docs.docs) {
         docs.docs = docs.docs.map(function (doc) {
            return self.transformContactWebsiteDetail(doc, appendDetailData, isTranslate);
         });
         return {
            ...docs,
            ...appendListData,
         };
      } else {
         docs = docs.map(function (doc) {
            return self.transformContactWebsiteDetail(doc, appendDetailData, isTranslate);
         });
         return docs;
      }
   }

   transformContactWebsiteDetail(doc, appendData = {}, isTranslate = false) {
      if (!doc || doc == doc._id) return doc;
      return {
         id: doc._id,
         name: doc.name,
         email: doc.email,
         phone: doc.phone,
         question: doc.question,
         // status: doc.status,
         // messageFile: doc.messageFile ? doc.thumb('messageFile') : null,
         deletedAt: doc.deletedAt ? doc.deletedAt : null,
         createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
         updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
         ...appendData,
      };
   }

   transformContactWebsiteExport(docs, appendData = {}, fileName?: string, customHeaders?: Array<string>) {
      return {
         excel: {
            name: fileName || `ContactWebsites-${moment().format('YYYY-MM-DD')}`,
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
                          phone: doc.phone,
                          email: doc.email,
                          //   status: doc.status,
                          question: doc.question,
                          //   messageFile: messageFile,
                          createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
                          updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
                       };
                    })
                  : [{}],
            customHeaders: customHeaders || ['ID', 'Name', 'Phone', 'Email', 'Question', 'createdAt', 'Date Modified'],
         },
      };
   }
}
