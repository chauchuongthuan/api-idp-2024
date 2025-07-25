import {
   Body,
   Controller,
   Get,
   Post,
   Put,
   Delete,
   Request,
   UseInterceptors,
   UploadedFiles,
   Param,
   Query,
   UseGuards,
} from '@nestjs/common';
import { TransformerCustomerService } from '@common/customer/services/transformerCustomer.service';
import { ResponseService } from '@core/services/response.service';
import { UserSecure } from '@common/auth/user/decorators/userSecure.decorator';
import { HasFile } from '@core/decorators/hasFile.decorator';
import { ApiBody, ApiTags, ApiHeader, ApiParam } from '@nestjs/swagger';
import { ActivityInterceptor } from '@core/interceptors/activity.interceptor';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { DefaultListQuery } from '@core/decorators/defaultListQuery.decorator';
import { ApplicationService } from '../services/application.service';
import { TransformerApplicationService } from '../services/transformerApplication.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeApplicationDto } from '../dto/beApplication.dto';

@ApiTags('Admin/Applications')
@Controller('admin/applications')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeApplicationController {
   constructor(
      private applicationService: ApplicationService,
      private transformer: TransformerApplicationService,
      private response: ResponseService,
   ) {}

   // Find list Applications
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.application_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.applicationService.findAll(query);
      if (query.get && query.export) return this.transformer.transformApplicationExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformApplicationList(items));
   }

   // Create a new Application

   @Post()
   @ApiBody({ type: BeApplicationDto })
   @ACL(Permissions.application_add)
   @HasFile()
   async create(@Body() dto: BeApplicationDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.applicationService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformApplicationDetail(item));
   }

   // Update Application

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.application_edit)
   async update(@Param('id') id: string, @Body() dto: BeApplicationDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.applicationService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformApplicationDetail(item));
   }

   // Delete Application

   @Delete()
   @ACL(Permissions.application_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.applicationService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get Application by Id

   @Get(':id')
   @ACL(Permissions.application_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const application = await this.applicationService.detail(id);
      if (!application) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformApplicationDetail(application));
   }
}
