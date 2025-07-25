import { BeCategoryDto } from './../dto/beCategory.dto';
import { Body, Controller, Get, Param, Post, Put, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ResponseService } from '@core/services/response.service';
import { CategoryService } from '../services/category.service';
import { TransformerCategoryService } from '../services/transformerCategory.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { UserSecure } from '@src/common/auth/user/decorators/userSecure.decorator';
import { ACL } from '@common/auth/decorators/acl.decorator';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { HasFile } from '@core/decorators/hasFile.decorator';
import { saveFileContent } from '@core/helpers/content';
import { Permissions } from '@core/services/permission.service';
import { DefaultListQuery } from '@core/decorators/defaultListQuery.decorator';
import { ActivityInterceptor } from '@core/interceptors/activity.interceptor';
import { UserAuth } from '@src/common/auth/user/decorators/user.decorator';
import { isNotEmpty } from 'class-validator';
@ApiTags('Admin/Categories')
@Controller('admin/categories')
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
@UserSecure()
export class BeCategoryController {
   constructor(
      private category: CategoryService,
      private transformer: TransformerCategoryService,
      private response: ResponseService,
   ) {}

   @Get()
   @ACL(Permissions.category_list)
   @DefaultListQuery()
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.category.findAll(query);
      // if (query.export && query.get) return this.transformer.transformCategoryExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformCategoryList(items));
   }

   @Get('get-tree')
   @ACL(Permissions.category_list)
   @DefaultListQuery()
   async getTree(@Query() query: Record<string, any>, @UserAuth() user: Record<string, any>): Promise<any> {
      const items = await this.category.getTree(query);
      return this.response.fetchListSuccess(await this.transformer.transformTreeList(items));
   }

   @Get(':id')
   @ACL(Permissions.category_edit)
   async findById(@Param('id') id: string): Promise<any> {
      const query = {};
      const item = await this.category.findById(query, id);
      if (!item) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformCategoryDetail(item));
   }

   @Post()
   @ACL(Permissions.category_add)
   @HasFile()
   async add(@UploadedFiles() files, @Body() dto: BeCategoryDto, @UserAuth() user: Record<string, any>): Promise<any> {
      const item = await this.category.create(dto);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformCategoryDetail(item));
   }

   @Put(':id')
   @ACL(Permissions.category_edit)
   @HasFile()
   async edit(
      @UploadedFiles() files,
      // @Body('contentRmImgs') contentRmImgs: Array<string>,
      @Param('id') id: string,
      @Body() dto: BeCategoryDto,
   ): Promise<any> {
      const item = await this.category.update(id, dto);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformCategoryDetail(item));
   }

   @Delete()
   @ACL(Permissions.category_delete)
   async deletes(@Body('ids') ids: Array<string>, @UserAuth() user: Record<string, any>): Promise<any> {
      const items = await this.category.deletes(ids);
      if (!items) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }
}
