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
import { CommunityService } from '../services/community.service';
import { TransformerCommunityService } from '../services/transformerCommunity.service';
import { ACL } from '@src/common/auth/decorators/acl.decorator';
import { Permissions } from '@src/core/services/permission.service';
import { BeCommunityDto } from '../dto/beCommunity.dto';

@ApiTags('Admin/Communities')
@Controller('admin/communities')
@UserSecure()
@UseInterceptors(CoreTransformInterceptor, ActivityInterceptor)
export class BeCommunityController {
   constructor(
      private communityService: CommunityService,
      private transformer: TransformerCommunityService,
      private response: ResponseService,
   ) {}

   // Find list communitys
   @Get()
   @DefaultListQuery()
   @ACL(Permissions.community_list)
   async findAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.communityService.findAll(query);
      if (query.get && query.export) return this.transformer.transformCommunityExport(items);
      return this.response.fetchListSuccess(await this.transformer.transformCommunityList(items));
   }

   // Create a new community

   @Post()
   @ApiBody({ type: BeCommunityDto })
   @ACL(Permissions.community_add)
   @HasFile()
   async create(@Body() dto: BeCommunityDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.communityService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformCommunityDetail(item));
   }

   // Update community

   @Put(':id')
   @ApiParam({ name: 'id', type: String })
   @HasFile()
   @ACL(Permissions.community_edit)
   async update(@Param('id') id: string, @Body() dto: BeCommunityDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.communityService.update(id, dto, files);
      if (!item) return this.response.updatedFail();
      return this.response.updatedSuccess(await this.transformer.transformCommunityDetail(item));
   }

   // Delete community

   @Delete()
   @ACL(Permissions.community_delete)
   async deletes(@Body('ids') ids: Array<string>): Promise<any> {
      const item = await this.communityService.deletes(ids);
      if (!item) return this.response.deletedFail();
      return this.response.deletedSuccess();
   }

   // Get community by Id

   @Get(':id')
   @ACL(Permissions.community_detail)
   async getById(@Param('id') id: string): Promise<any> {
      const community = await this.communityService.detail(id);
      if (!community) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformCommunityDetail(community));
   }
}
