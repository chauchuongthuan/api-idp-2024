import { Controller, Get, Query, Param, UseInterceptors } from '@nestjs/common';
import { ResponseService } from '@core/services/response.service';
import { ApiTags } from '@nestjs/swagger';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { saveFileContent } from '@core/helpers/content';
import { CategoryService } from '../services/category.service';
import { TransformerCategoryService } from '../services/transformerCategory.service';
import { DefaultListQuery } from '@core/decorators/defaultListQuery.decorator';

@ApiTags('Frontend/Categories')
@Controller('categories')
@UseInterceptors(CoreTransformInterceptor)
export class FeCategoryController {
   constructor(
      private categoryService: CategoryService,
      private transformer: TransformerCategoryService,
      private response: ResponseService,
   ) {}

   // @Get()
   // @DefaultListQuery()
   // async getAll(@Query() query: Record<string, any>): Promise<any> {
   //    const items = await this.categoryService.findAll(query);
   //    return this.response.fetchListSuccess(await this.transformer.transformCategoryList(items));
   // }

   @Get('get-tree')
   @DefaultListQuery()
   async getTree(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.categoryService.getTreeFrontend(query);
      return this.response.fetchListSuccess(await this.transformer.transformTreeList(items));
   }

   @Get(':slug')
   async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
      const item = await this.categoryService.findBySlug(query, slug);
      if (!item) return this.response.detailFail();
      await saveFileContent('content', item, 'postCategories', false);
      return this.response.detailSuccess(await this.transformer.transformCategoryDetail(item));
   }
}
