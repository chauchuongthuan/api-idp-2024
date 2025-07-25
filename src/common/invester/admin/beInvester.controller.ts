import { BeInvesterDto } from '../dto/beInvester.dto';
import { Body, Controller, Get, Param, Post, Put, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ResponseService } from '@core/services/response.service';
import { InvesterService } from '../services/invester.service';
import { TransformerInvesterService } from '../services/transformerInvester.service';
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
@ApiTags('Admin/Investers')
@Controller('admin/investers')
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
@UserSecure()
export class BeInvesterController {
   constructor(
      private invester: InvesterService,
      private transformer: TransformerInvesterService,
      private response: ResponseService,
   ) {}

   @Get()
   @ACL(Permissions.invester_list)
   @DefaultListQuery()
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.invester.findAll(query);
      // if (query.export && query.get) return this.transformer.transformInvesterExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformInvesterList(items));
   }

   @Get(':id')
   @ACL(Permissions.invester_edit)
   async findById(@Param('id') id: string): Promise<any> {
      const query = {};
      const item = await this.invester.findById(query, id);
      if (!item) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformInvesterDetail(item));
   }

   @Post()
   @ACL(Permissions.invester_add)
   @HasFile()
   async add(@UploadedFiles() files, @Body() dto: BeInvesterDto, @UserAuth() user: Record<string, any>): Promise<any> {
      const item = await this.invester.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformInvesterDetail(item));
   }

   @Put(':id')
   @ACL(Permissions.invester_edit)
   @HasFile()
   async edit(
      @UploadedFiles() files,
      // @Body('contentRmImgs') contentRmImgs: Array<string>,
      @Param('id') id: string,
      @Body() dto: BeInvesterDto,
   ): Promise<any> {
      const item = await this.invester.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformInvesterDetail(item));
   }

   @Delete()
   @ACL(Permissions.invester_delete)
   async deletes(@Body('ids') ids: Array<string>, @UserAuth() user: Record<string, any>): Promise<any> {
      const items = await this.invester.deletes(ids);
      if (!items) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }
}
