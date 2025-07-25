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
import { ContactWebsiteService } from '../services/contactWebsite.service';
import { TransformerContactWebsiteService } from '../services/transformerContactWebsite.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeContactWebsiteDto } from '../dto/beContactWebsite.dto';

@ApiTags('Admin/ContactWebsites')
@Controller('admin/contactWebsites')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeContactWebsiteController {
   constructor(
      private contactWebsiteService: ContactWebsiteService,
      private transformer: TransformerContactWebsiteService,
      private response: ResponseService,
   ) {}

   // Find list contactWebsites
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.contact_website_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.contactWebsiteService.findAll(query);
      if (query.get && query.export) return this.transformer.transformContactWebsiteExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformContactWebsiteList(items));
   }

   // Create a new contactWebsite

   @Post()
   @ApiBody({ type: BeContactWebsiteDto })
   @ACL(Permissions.contact_website_add)
   @HasFile()
   async create(@Body() dto: BeContactWebsiteDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.contactWebsiteService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformContactWebsiteDetail(item));
   }

   // Update contactWebsite

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.contact_website_edit)
   async update(
      @Param('id') id: string,
      @Body() dto: BeContactWebsiteDto,
      @UploadedFiles() files: Record<any, any>,
   ): Promise<any> {
      const item = await this.contactWebsiteService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformContactWebsiteDetail(item));
   }

   // Delete contactWebsite

   @Delete()
   @ACL(Permissions.contact_website_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.contactWebsiteService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get contactWebsite by Id

   @Get(':id')
   @ACL(Permissions.contact_website_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const contactWebsite = await this.contactWebsiteService.detail(id);
      if (!contactWebsite) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformContactWebsiteDetail(contactWebsite));
   }
}
