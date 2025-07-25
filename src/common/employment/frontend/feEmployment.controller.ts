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
import { EmploymentService } from '../services/employment.service';
import { TransformerEmploymentService } from '../services/transformerEmployment.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeEmploymentDto } from '../dto/beEmployment.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('Employment')
@Controller('employments')
@UseInterceptors(CoreTransformInterceptor)
export class FeEmploymentController {
   constructor(
      private employmentService: EmploymentService,
      private response: ResponseService,
      private transformer: TransformerEmploymentService,
   ) {}

   @Get()
   @DefaultListQuery()
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.employmentService.findAll(query);
      return this.response.fetchListSuccess(await this.transformer.transformEmploymentList(items));
   }

   // @Get(':slug')
   // async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
   //    const item = await this.employmentService.findBySlug(query, slug);
   //    if (!item) return this.response.detailFail();
   //    return this.response.detailSuccess(await this.transformer.transformEmploymentDetail(item));
   // }
}
