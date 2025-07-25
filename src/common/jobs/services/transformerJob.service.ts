import { TransformerDepartmentService } from './../../department/services/transformerDepartment.service';
import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DateTime } from '@core/constants/dateTime.enum';
import { TransformerEmploymentService } from '@src/common/employment/services/transformerEmployment.service';
import { TransformerExperienceService } from '@src/common/experience/services/transformerExperience.service';
import { TransformerJobTagService } from '@src/common/jobTag/services/transformerJobTag.service';
import { TransformerPositionLevelService } from '@src/common/positionLevel/services/transformerPositionLevel.service';
import { TransformerQualificationService } from '@src/common/qualification/services/transformerQualification.service';
import { TransformerSalaryService } from '@src/common/salary/services/transformerSalary.service';
import { TransformerWorkplaceService } from '@src/common/workplace/services/transformerWorkplace.service';
import { photos } from '@src/core/helpers/file';
import { TransformerOccupationService } from '@src/common/occupation/services/transformerOccupation.service';
const moment = require('moment');

@Injectable({ scope: Scope.REQUEST })
export class TransformerJobService {
   constructor(
      @Inject(REQUEST) private request: any,
      private transformerDepartmentService: TransformerDepartmentService,
      private transformerWorkplaceService: TransformerWorkplaceService,
      private transformerPositionLevelService: TransformerPositionLevelService,
      private transformerEmploymentService: TransformerEmploymentService,
      private transformerQualificationService: TransformerQualificationService,
      private transformerExperienceService: TransformerExperienceService,
      private transformerSalaryService: TransformerSalaryService,
      private transformerOccupationService: TransformerOccupationService,
      private transformerJobTagService: TransformerJobTagService,
   ) {}

   transformJobList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}) {
      const self = this;
      if (docs.docs) {
         docs.docs = docs.docs.map(function (doc) {
            return self.transformJobDetail(doc, appendDetailData, isTranslate);
         });
         return {
            ...docs,
            ...appendListData,
         };
      } else {
         docs = docs.map(function (doc) {
            return self.transformJobDetail(doc, appendDetailData, isTranslate);
         });
         return docs;
      }
   }

   transformJobDetail(doc, appendData = {}, isTranslate = false) {
      if (!doc || doc == doc._id) return doc;
      return {
         id: doc._id,
         image: doc?.image ? doc?.thumb('image') : undefined,
         imageMb: doc?.imageMb ? doc?.thumb('imageMb') : undefined,
         thumbImage: doc?.thumbImage ? doc?.thumb('thumbImage') : undefined,
         thumbImageMb: doc?.thumbImageMb ? doc?.thumb('thumbImageMb') : undefined,
         name: doc.name,
         name_en: doc.name_en,
         slug: doc.slug,
         quantity: doc?.quantity,
         department: doc.department ? this.transformerDepartmentService.transformDepartmentDetail(doc.department) : null,
         occupation: doc.occupation ? this.transformerOccupationService.transformOccupationDetail(doc.occupation) : null,
         workplace: doc.workplace ? this.transformerWorkplaceService.transformWorkplaceDetail(doc.workplace) : null,
         positionLevel: doc.positionLevel
            ? this.transformerPositionLevelService.transformPositionLevelDetail(doc.positionLevel)
            : null,
         salary: doc.salary ? this.transformerSalaryService.transformSalaryDetail(doc.salary) : null,
         employment: doc.employment ? this.transformerEmploymentService.transformEmploymentDetail(doc.employment) : null,
         qualification: doc.qualification
            ? this.transformerQualificationService.transformQualificationDetail(doc.qualification)
            : null,
         experience: doc.experience ? this.transformerExperienceService.transformExperienceDetail(doc.experience) : null,
         jobTag: this.transformerJobTagService.transformJobTagList(doc.jobTag),
         jobTagNames: doc.jobTag.length ? doc.jobTag.map((jobTag) => jobTag.name) : [],
         content: doc.content,
         deletedAt: doc.deletedAt ? doc.deletedAt : null,
         deadline: doc?.deadline ? moment(doc?.deadline).format(DateTime.CREATED_AT) : null,
         createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
         updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
         ...appendData,
      };
   }

   transformJobExport(docs, appendData = {}, fileName?: string, customHeaders?: Array<string>) {
      return {
         excel: {
            name: fileName || `Job-${moment().format('YYYY-MM-DD')}`,
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
                          slug: doc.slug,
                          description: doc.description,
                          description_en: doc.description_en,
                          createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
                          updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
                       };
                    })
                  : [{}],
            customHeaders: customHeaders || [
               'ID',
               'Name',
               'Name En',
               'Slug',
               'Description',
               'Description En',
               'createdAt',
               'Date Modified',
            ],
         },
      };
   }
}
