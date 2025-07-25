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
import { WorkplaceService } from '../services/workplace.service';
import { TransformerWorkplaceService } from '../services/transformerWorkplace.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeWorkplaceDto } from '../dto/beWorkplace.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('Workplace')
@Controller('workplaces')
@UseInterceptors(CoreTransformInterceptor)
export class FeWorkplaceController {
   constructor(
      private workplaceService: WorkplaceService,
      private response: ResponseService,
      private transformer: TransformerWorkplaceService,
   ) {}

   @Get()
   @DefaultListQuery()
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.workplaceService.findAll(query);
      return this.response.fetchListSuccess(await this.transformer.transformWorkplaceList(items));
   }

   // @Get(':slug')
   // async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
   //    const item = await this.workplaceService.findBySlug(query, slug);
   //    if (!item) return this.response.detailFail();
   //    return this.response.detailSuccess(await this.transformer.transformWorkplaceDetail(item));
   // }
}
