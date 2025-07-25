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
import { DepartmentService } from '../services/department.service';
import { TransformerDepartmentService } from '../services/transformerDepartment.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeDepartmentDto } from '../dto/beDepartment.dto';

@ApiTags('Admin/Departments')
@Controller('admin/departments')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeDepartmentController {
   constructor(
      private departmentService: DepartmentService,
      private transformer: TransformerDepartmentService,
      private response: ResponseService,
   ) {}

   // Find list departments
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.department_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.departmentService.findAll(query);
      if (query.get && query.export) return this.transformer.transformDepartmentExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformDepartmentList(items));
   }

   // Create a new department

   @Post()
   @ApiBody({ type: BeDepartmentDto })
   @ACL(Permissions.department_add)
   @HasFile()
   async create(@Body() dto: BeDepartmentDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.departmentService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformDepartmentDetail(item));
   }

   // Update Department

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.department_edit)
   async update(@Param('id') id: string, @Body() dto: BeDepartmentDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.departmentService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformDepartmentDetail(item));
   }

   // Delete Department

   @Delete()
   @ACL(Permissions.department_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.departmentService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get department by Id

   @Get(':id')
   @ACL(Permissions.department_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const department = await this.departmentService.detail(id);
      if (!department) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformDepartmentDetail(department));
   }
}
