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
import { PositionLevelService } from '../services/positionLevel.service';
import { TransformerPositionLevelService } from '../services/transformerPositionLevel.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BePositionLevelDto } from '../dto/bePositionLevel.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('PositionLevel')
@Controller('positionLevels')
@UseInterceptors(CoreTransformInterceptor)
export class FePositionLevelController {
   constructor(
      private positionLevelService: PositionLevelService,
      private response: ResponseService,
      private transformer: TransformerPositionLevelService,
   ) {}

   @Get()
   @DefaultListQuery()
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.positionLevelService.findAll(query);
      return this.response.fetchListSuccess(await this.transformer.transformPositionLevelList(items));
   }

   // @Get(':slug')
   // async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
   //    const item = await this.positionLevelService.findBySlug(query, slug);
   //    if (!item) return this.response.detailFail();
   //    return this.response.detailSuccess(await this.transformer.transformPositionLevelDetail(item));
   // }
}
