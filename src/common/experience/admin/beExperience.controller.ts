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
import { ExperienceService } from '../services/experience.service';
import { TransformerExperienceService } from '../services/transformerExperience.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeExperienceDto } from '../dto/beExperience.dto';

@ApiTags('Admin/Experiences')
@Controller('admin/experiences')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeExperienceController {
   constructor(
      private experienceService: ExperienceService,
      private transformer: TransformerExperienceService,
      private response: ResponseService,
   ) {}

   // Find list Experiences
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.experience_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.experienceService.findAll(query);
      if (query.get && query.export) return this.transformer.transformExperienceExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformExperienceList(items));
   }

   // Create a new Experience

   @Post()
   @ApiBody({ type: BeExperienceDto })
   @ACL(Permissions.experience_add)
   @HasFile()
   async create(@Body() dto: BeExperienceDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.experienceService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformExperienceDetail(item));
   }

   // Update Experience

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.experience_edit)
   async update(@Param('id') id: string, @Body() dto: BeExperienceDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.experienceService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformExperienceDetail(item));
   }

   // Delete Experience

   @Delete()
   @ACL(Permissions.experience_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.experienceService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get experience by Id

   @Get(':id')
   @ACL(Permissions.experience_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const experience = await this.experienceService.detail(id);
      if (!experience) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformExperienceDetail(experience));
   }
}
