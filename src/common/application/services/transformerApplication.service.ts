import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DateTime } from '@core/constants/dateTime.enum';
import { TransformerJobService } from '@src/common/jobs/services/transformerJob.service';
const moment = require('moment');

@Injectable({ scope: Scope.REQUEST })
export class TransformerApplicationService {
   constructor(@Inject(REQUEST) private request: any, private readonly transformerJob: TransformerJobService) {}

   transformApplicationList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}) {
      const self = this;
      if (docs.docs) {
         docs.docs = docs.docs.map(function (doc) {
            return self.transformApplicationDetail(doc, appendDetailData, isTranslate);
         });
         return {
            ...docs,
            ...appendListData,
         };
      } else {
         docs = docs.map(function (doc) {
            return self.transformApplicationDetail(doc, appendDetailData, isTranslate);
         });
         return docs;
      }
   }

   transformApplicationDetail(doc, appendData = {}, isTranslate = false) {
      if (!doc || doc == doc._id) return doc;
      return {
         id: doc._id,
         name: doc.name,
         email: doc.email,
         phone: doc.phone,
         birthdate: doc.birthdate,
         job: doc.job ? this.transformerJob.transformJobDetail(doc.job) : null,
         file: doc.file ? doc.thumb('file') : null,
         deletedAt: doc.deletedAt ? doc.deletedAt : null,
         createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
         updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
         ...appendData,
      };
   }

   transformApplicationExport(docs, appendData = {}, fileName?: string, customHeaders?: Array<string>) {
      return {
         excel: {
            name: fileName || `Applications-${moment().format('YYYY-MM-DD')}`,
            data:
               docs.length > 0
                  ? docs.map(function (doc) {
                       let file = null;
                       if (doc.file) {
                          doc.file.includes('http') || doc.file.includes('https')
                             ? (file = doc.file)
                             : (file = doc.thumb('file', 'FB'));
                       }
                       return {
                          id: `${doc._id}`,
                          name: doc.name,
                          phone: doc.phone,
                          email: doc.email,
                          birthdate: doc.birthdate,
                          job: doc.job,
                          file: file,
                          createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
                          updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
                       };
                    })
                  : [{}],
            customHeaders: customHeaders || [
               'ID',
               'Name',
               'Phone',
               'Email',
               'Birthdate',
               'Job',
               'File',
               'createdAt',
               'Date Modified',
            ],
         },
      };
   }
}
