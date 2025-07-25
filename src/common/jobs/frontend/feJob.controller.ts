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
import { JobService } from '../services/job.service';
import { TransformerJobService } from '../services/transformerJob.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeJobDto } from '../dto/beJob.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('Job')
@Controller('jobs')
@UseInterceptors(CoreTransformInterceptor)
export class FeJobController {
   constructor(private jobService: JobService, private response: ResponseService, private transformer: TransformerJobService) {}

   @Get()
   @DefaultListQuery()
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.jobService.findAllFrondEnd(query);

      return this.response.fetchListSuccess(await this.transformer.transformJobList(items));
   }

   @Get(':slug')
   async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
      const item = await this.jobService.findBySlug(query, slug);
      if (!item) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformJobDetail(item));
   }
}
