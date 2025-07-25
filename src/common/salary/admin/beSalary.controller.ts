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
import { SalaryService } from '../services/salary.service';
import { TransformerSalaryService } from '../services/transformerSalary.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeSalaryDto } from '../dto/beSalary.dto';

@ApiTags('Admin/Salaries')
@Controller('admin/salaries')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeSalaryController {
   constructor(
      private salaryService: SalaryService,
      private transformer: TransformerSalaryService,
      private response: ResponseService,
   ) {}

   // Find list Salarys
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.salary_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.salaryService.findAll(query);
      if (query.get && query.export) return this.transformer.transformSalaryExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformSalaryList(items));
   }

   // Create a new Salary

   @Post()
   @ApiBody({ type: BeSalaryDto })
   @ACL(Permissions.salary_add)
   @HasFile()
   async create(@Body() dto: BeSalaryDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.salaryService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformSalaryDetail(item));
   }

   // Update salary

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.salary_edit)
   async update(@Param('id') id: string, @Body() dto: BeSalaryDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.salaryService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformSalaryDetail(item));
   }

   // Delete Salary

   @Delete()
   @ACL(Permissions.salary_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.salaryService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get salary by Id

   @Get(':id')
   @ACL(Permissions.salary_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const salary = await this.salaryService.detail(id);
      if (!salary) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformSalaryDetail(salary));
   }
}
