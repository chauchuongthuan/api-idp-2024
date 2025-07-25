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
import { QualificationService } from '../services/qualification.service';
import { TransformerQualificationService } from '../services/transformerQualification.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeQualificationDto } from '../dto/beQualification.dto';

@ApiTags('Admin/Qualifications')
@Controller('admin/qualifications')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeQualificationController {
   constructor(
      private qualificationService: QualificationService,
      private transformer: TransformerQualificationService,
      private response: ResponseService,
   ) {}

   // Find list Qualifications
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.qualification_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.qualificationService.findAll(query);
      if (query.get && query.export) return this.transformer.transformQualificationExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformQualificationList(items));
   }

   // Create a new Qualification

   @Post()
   @ApiBody({ type: BeQualificationDto })
   @ACL(Permissions.qualification_add)
   @HasFile()
   async create(@Body() dto: BeQualificationDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.qualificationService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformQualificationDetail(item));
   }

   // Update Qualification

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.qualification_edit)
   async update(
      @Param('id') id: string,
      @Body() dto: BeQualificationDto,
      @UploadedFiles() files: Record<any, any>,
   ): Promise<any> {
      const item = await this.qualificationService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformQualificationDetail(item));
   }

   // Delete Qualification

   @Delete()
   @ACL(Permissions.qualification_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.qualificationService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get qualification by Id

   @Get(':id')
   @ACL(Permissions.qualification_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const qualification = await this.qualificationService.detail(id);
      if (!qualification) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformQualificationDetail(qualification));
   }
}
