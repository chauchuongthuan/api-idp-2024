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
import { OccupationService } from '../services/occupation.service';
import { TransformerOccupationService } from '../services/transformerOccupation.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeOccupationDto } from '../dto/beOccupation.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('Occupation')
@Controller('occupations')
@UseInterceptors(CoreTransformInterceptor)
export class FeOccupationController {
   constructor(
      private occupationService: OccupationService,
      private response: ResponseService,
      private transformer: TransformerOccupationService,
   ) {}

   @Get()
   @DefaultListQuery()
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.occupationService.findAll(query);
      return this.response.fetchListSuccess(await this.transformer.transformOccupationList(items));
   }

   // @Get(':slug')
   // async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
   //    const item = await this.occupationService.findBySlug(query, slug);
   //    if (!item) return this.response.detailFail();
   //    return this.response.detailSuccess(await this.transformer.transformOccupationDetail(item));
   // }
}
