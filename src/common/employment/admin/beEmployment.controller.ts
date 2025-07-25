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
import { EmploymentService } from '../services/employment.service';
import { TransformerEmploymentService } from '../services/transformerEmployment.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeEmploymentDto } from '../dto/beEmployment.dto';

@ApiTags('Admin/Employments')
@Controller('admin/employments')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeEmploymentController {
   constructor(
      private employmentService: EmploymentService,
      private transformer: TransformerEmploymentService,
      private response: ResponseService,
   ) {}

   // Find list Employments
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.employment_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.employmentService.findAll(query);
      if (query.get && query.export) return this.transformer.transformEmploymentExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformEmploymentList(items));
   }

   // Create a new Employment

   @Post()
   @ApiBody({ type: BeEmploymentDto })
   @ACL(Permissions.employment_add)
   @HasFile()
   async create(@Body() dto: BeEmploymentDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.employmentService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformEmploymentDetail(item));
   }

   // Update Employment

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.employment_edit)
   async update(@Param('id') id: string, @Body() dto: BeEmploymentDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.employmentService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformEmploymentDetail(item));
   }

   // Delete Employment

   @Delete()
   @ACL(Permissions.employment_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.employmentService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get employment by Id

   @Get(':id')
   @ACL(Permissions.employment_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const employment = await this.employmentService.detail(id);
      if (!employment) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformEmploymentDetail(employment));
   }
}
