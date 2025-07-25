import { Controller, Get, Query, Param, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ResponseService } from '@core/services/response.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { saveFileContent } from '@core/helpers/content';
import { InvesterService } from '../services/invester.service';
import { TransformerInvesterService } from '../services/transformerInvester.service';
import { DefaultListQuery } from '@core/decorators/defaultListQuery.decorator';

@ApiTags('Frontend/Investers')
@Controller('investers')
@UseInterceptors(CoreTransformInterceptor)
export class FeInvesterController {
   constructor(
      private investerService: InvesterService,
      private transformer: TransformerInvesterService,
      private response: ResponseService,
   ) {}

   @Get()
   @DefaultListQuery()
   @applyDecorators(ApiQuery({ required: false, name: 'title', description: 'Title', example: 'Test name' }))
   @applyDecorators(ApiQuery({ required: false, name: 'category', description: 'Category slug', example: 'cate-cha' }))
   @applyDecorators(ApiQuery({ required: false, name: 'publishedAt', description: 'Year', example: '2024' }))
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.investerService.findAllFrontend(query);
      return this.response.fetchListSuccess(await this.transformer.transformInvesterList(items));
   }

   // @Get(':slug')
   // async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
   //    const item = await this.investerService.findBySlug(query, slug);
   //    if (!item) return this.response.detailFail();
   //    return this.response.detailSuccess(await this.transformer.transformInvesterDetail(item));
   // }
}
