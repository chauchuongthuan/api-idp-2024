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
import { CoreMemberService } from '../services/coreMember.service';
import { TransformerCoreMemberService } from '../services/transformerCoreMember.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeCoreMemberDto } from '../dto/beCoreMember.dto';

@ApiTags('Admin/CoreMembers')
@Controller('admin/coreMembers')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeCoreMemberController {
   constructor(
      private coreMemberService: CoreMemberService,
      private transformer: TransformerCoreMemberService,
      private response: ResponseService,
   ) {}

   // Find list CoreMembers
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.core_member_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.coreMemberService.findAll(query);
      if (query.get && query.export) return this.transformer.transformCoreMemberExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformCoreMemberList(items));
   }

   // Create a new CoreMember

   @Post()
   @ApiBody({ type: BeCoreMemberDto })
   @ACL(Permissions.core_member_add)
   @HasFile()
   async create(@Body() dto: BeCoreMemberDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.coreMemberService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformCoreMemberDetail(item));
   }

   // Update CoreMember

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.core_member_edit)
   async update(@Param('id') id: string, @Body() dto: BeCoreMemberDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.coreMemberService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformCoreMemberDetail(item));
   }

   // Delete CoreMember

   @Delete()
   @ACL(Permissions.core_member_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.coreMemberService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get coreMember by Id

   @Get(':id')
   @ACL(Permissions.core_member_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const coreMember = await this.coreMemberService.detail(id);
      if (!coreMember) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformCoreMemberDetail(coreMember));
   }
}
