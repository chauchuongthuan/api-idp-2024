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
import { ExperienceService } from '../services/experience.service';
import { TransformerExperienceService } from '../services/transformerExperience.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeExperienceDto } from '../dto/beExperience.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('Experience')
@Controller('experiences')
@UseInterceptors(CoreTransformInterceptor)
export class FeExperienceController {
   constructor(
      private experienceService: ExperienceService,
      private response: ResponseService,
      private transformer: TransformerExperienceService,
   ) {}

   @Get()
   @DefaultListQuery()
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.experienceService.findAll(query);
      return this.response.fetchListSuccess(await this.transformer.transformExperienceList(items));
   }

   // @Get(':slug')
   // async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
   //    const item = await this.experienceService.findBySlug(query, slug);
   //    if (!item) return this.response.detailFail();
   //    return this.response.detailSuccess(await this.transformer.transformExperienceDetail(item));
   // }
}
