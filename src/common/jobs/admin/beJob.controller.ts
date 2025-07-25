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
import { JobService } from '../services/job.service';
import { TransformerJobService } from '../services/transformerJob.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeJobDto } from '../dto/beJob.dto';

@ApiTags('Admin/Jobs')
@Controller('admin/jobs')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeJobController {
   constructor(private jobService: JobService, private transformer: TransformerJobService, private response: ResponseService) {}

   // Find list Jobs
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.job_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.jobService.findAll(query);
      if (query.get && query.export) return this.transformer.transformJobExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformJobList(items));
   }

   // Create a new Job

   @Post()
   @ApiBody({ type: BeJobDto })
   @ACL(Permissions.job_add)
   @HasFile()
   async create(@Body() dto: BeJobDto, @UploadedFiles() files): Promise<any> {
      const item = await this.jobService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformJobDetail(item));
   }

   // Update Job

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.job_edit)
   async update(@Param('id') id: string, @Body() dto: BeJobDto, @UploadedFiles() files): Promise<any> {
      const item = await this.jobService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformJobDetail(item));
   }

   // Delete Job

   @Delete()
   @ACL(Permissions.job_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.jobService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get job by Id

   @Get(':id')
   @ACL(Permissions.job_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const job = await this.jobService.detail(id);
      if (!job) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformJobDetail(job));
   }
}
