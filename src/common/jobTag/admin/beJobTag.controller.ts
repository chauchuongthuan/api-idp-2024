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
import { JobTagService } from '../services/jobTag.service';
import { TransformerJobTagService } from '../services/transformerJobTag.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeJobTagDto } from '../dto/beJobTag.dto';

@ApiTags('Admin/JobTags')
@Controller('admin/jobTags')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeJobTagController {
   constructor(
      private jobTagService: JobTagService,
      private transformer: TransformerJobTagService,
      private response: ResponseService,
   ) {}

   // Find list JobTags
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.job_tag_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.jobTagService.findAll(query);
      if (query.get && query.export) return this.transformer.transformJobTagExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformJobTagList(items));
   }

   // Create a new JobTag

   @Post()
   @ApiBody({ type: BeJobTagDto })
   @ACL(Permissions.job_tag_add)
   @HasFile()
   async create(@Body() dto: BeJobTagDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.jobTagService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformJobTagDetail(item));
   }

   // Update jobTag

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.job_tag_edit)
   async update(@Param('id') id: string, @Body() dto: BeJobTagDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.jobTagService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformJobTagDetail(item));
   }

   // Delete JobTag

   @Delete()
   @ACL(Permissions.job_tag_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.jobTagService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get jobTag by Id

   @Get(':id')
   @ACL(Permissions.job_tag_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const jobTag = await this.jobTagService.detail(id);
      if (!jobTag) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformJobTagDetail(jobTag));
   }
}
