/* eslint-disable prettier/prettier */
import {
   Body,
   Controller,
   Get,
   Post,
   Put,
   Request,
   UseInterceptors,
   UploadedFiles,
   Param,
   Query,
   HttpStatus,
   Delete,
} from '@nestjs/common';
import { ResponseService } from '@core/services/response.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { CommunityService } from '../services/community.service';
import { TransformerCommunityService } from '../services/transformerCommunity.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeCommunityDto } from '../dto/beCommunity.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('Community')
@Controller('communities')
@UseInterceptors(CoreTransformInterceptor)
export class FeCommunityController {
   constructor(
      private communityService: CommunityService,
      private response: ResponseService,
      private transformer: TransformerCommunityService,
   ) {}

   @Get()
   @DefaultListQuery()
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.communityService.findAll(query);
      return this.response.fetchListSuccess(await this.transformer.transformCommunityList(items));
   }

   @Get(':slug')
   async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
      const item = await this.communityService.findBySlug(query, slug);
      if (!item) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformCommunityDetail(item));
   }
}
