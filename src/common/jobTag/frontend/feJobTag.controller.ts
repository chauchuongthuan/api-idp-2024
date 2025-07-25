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
import { JobTagService } from '../services/jobTag.service';
import { TransformerJobTagService } from '../services/transformerJobTag.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeJobTagDto } from '../dto/beJobTag.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('JobTag')
@Controller('jobTags')
@UseInterceptors(CoreTransformInterceptor)
export class FeJobTagController {
   constructor(
      private jobTagService: JobTagService,
      private response: ResponseService,
      private transformer: TransformerJobTagService,
   ) {}

   @Get()
   @DefaultListQuery()
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.jobTagService.findAll(query);
      return this.response.fetchListSuccess(await this.transformer.transformJobTagList(items));
   }

   // @Get(':slug')
   // async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
   //    const item = await this.jobTagService.findBySlug(query, slug);
   //    if (!item) return this.response.detailFail();
   //    return this.response.detailSuccess(await this.transformer.transformJobTagDetail(item));
   // }
}
