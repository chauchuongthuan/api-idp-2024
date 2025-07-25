/* eslint-disable prettier/prettier */
import {
   Body,
   Controller,
   Get,
   Post,
   Put,
   Request,
   UseInterceptors,
   UploadedFiles,
   Param,
   Query,
   HttpStatus,
   Delete,
} from '@nestjs/common';
import { ResponseService } from '@core/services/response.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { QualificationService } from '../services/qualification.service';
import { TransformerQualificationService } from '../services/transformerQualification.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeQualificationDto } from '../dto/beQualification.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('Qualification')
@Controller('qualifications')
@UseInterceptors(CoreTransformInterceptor)
export class FeQualificationController {
   constructor(
      private qualificationService: QualificationService,
      private response: ResponseService,
      private transformer: TransformerQualificationService,
   ) {}

   @Get()
   @DefaultListQuery()
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.qualificationService.findAll(query);
      return this.response.fetchListSuccess(await this.transformer.transformQualificationList(items));
   }

   // @Get(':slug')
   // async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
   //    const item = await this.qualificationService.findBySlug(query, slug);
   //    if (!item) return this.response.detailFail();
   //    return this.response.detailSuccess(await this.transformer.transformQualificationDetail(item));
   // }
}
