import { Controller, Get, Query, Param, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ResponseService } from '@core/services/response.service';
import { PostCategoryService } from '../services/postCategory.service';
import { TransformerPostService } from '../services/transformerPost.service';
import { ApiExcludeController, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { saveFileContent } from '@core/helpers/content';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
@ApiTags('Frontend/PostCategory')
@Controller('post-categories')
@UseInterceptors(CoreTransformInterceptor)
// @ApiExcludeController()
export class FePostCategoryController {
   constructor(
      private category: PostCategoryService,
      private transformer: TransformerPostService,
      private response: ResponseService,
   ) {}

   @Get()
   @applyDecorators(ApiQuery({ required: true, name: 'get', description: 'Get all', example: 'true' }))
   async findByPageCode(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.category.findAllFrontend(query);
      return this.response.fetchListSuccess(await this.transformer.transformCategoryList(items));
   }

   @Get(':slug')
   async findById(@Param('slug') slug: string): Promise<any> {
      const item = await this.category.findBySlug(slug);
      if (!item) return this.response.detailFail();
      // await saveFileContent('content', item, 'postCategories', false);
      return this.response.detailSuccess(await this.transformer.transformCategoryDetail(item));
   }
}
