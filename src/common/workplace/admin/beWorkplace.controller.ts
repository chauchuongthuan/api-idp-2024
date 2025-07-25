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
import { WorkplaceService } from '../services/workplace.service';
import { TransformerWorkplaceService } from '../services/transformerWorkplace.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeWorkplaceDto } from '../dto/beWorkplace.dto';

@ApiTags('Admin/Workplaces')
@Controller('admin/workplaces')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeWorkplaceController {
   constructor(
      private workplaceService: WorkplaceService,
      private transformer: TransformerWorkplaceService,
      private response: ResponseService,
   ) {}

   // Find list Workplaces
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.workplace_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.workplaceService.findAll(query);
      if (query.get && query.export) return this.transformer.transformWorkplaceExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformWorkplaceList(items));
   }

   // Create a new Workplace

   @Post()
   @ApiBody({ type: BeWorkplaceDto })
   @ACL(Permissions.workplace_add)
   @HasFile()
   async create(@Body() dto: BeWorkplaceDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.workplaceService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformWorkplaceDetail(item));
   }

   // Update Workplace

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.workplace_edit)
   async update(@Param('id') id: string, @Body() dto: BeWorkplaceDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.workplaceService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformWorkplaceDetail(item));
   }

   // Delete workplace

   @Delete()
   @ACL(Permissions.workplace_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.workplaceService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get workplace by Id

   @Get(':id')
   @ACL(Permissions.workplace_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const workplace = await this.workplaceService.detail(id);
      if (!workplace) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformWorkplaceDetail(workplace));
   }
}
