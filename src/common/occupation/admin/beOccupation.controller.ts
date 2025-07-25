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
import { OccupationService } from '../services/occupation.service';
import { TransformerOccupationService } from '../services/transformerOccupation.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeOccupationDto } from '../dto/beOccupation.dto';

@ApiTags('Admin/Occupations')
@Controller('admin/occupations')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeOccupationController {
   constructor(
      private occupationService: OccupationService,
      private transformer: TransformerOccupationService,
      private response: ResponseService,
   ) {}

   // Find list Occupations
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.occupation_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.occupationService.findAll(query);
      if (query.get && query.export) return this.transformer.transformOccupationExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformOccupationList(items));
   }

   // Create a new Occupation

   @Post()
   @ApiBody({ type: BeOccupationDto })
   @ACL(Permissions.occupation_add)
   @HasFile()
   async create(@Body() dto: BeOccupationDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.occupationService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformOccupationDetail(item));
   }

   // Update Occupation

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.occupation_edit)
   async update(@Param('id') id: string, @Body() dto: BeOccupationDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.occupationService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformOccupationDetail(item));
   }

   // Delete Occupation

   @Delete()
   @ACL(Permissions.occupation_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.occupationService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get occupation by Id

   @Get(':id')
   @ACL(Permissions.occupation_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const occupation = await this.occupationService.detail(id);
      if (!occupation) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformOccupationDetail(occupation));
   }
}
