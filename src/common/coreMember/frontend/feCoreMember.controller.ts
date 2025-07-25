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
import { CoreMemberService } from '../services/coreMember.service';
import { TransformerCoreMemberService } from '../services/transformerCoreMember.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeCoreMemberDto } from '../dto/beCoreMember.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('CoreMember')
@Controller('coreMembers')
@UseInterceptors(CoreTransformInterceptor)
export class FeCoreMemberController {
   constructor(
      private coreMemberService: CoreMemberService,
      private response: ResponseService,
      private transformer: TransformerCoreMemberService,
   ) {}

   @Get()
   @DefaultListQuery()
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.coreMemberService.findAll(query);
      return this.response.fetchListSuccess(await this.transformer.transformCoreMemberList(items));
   }

   @Get(':slug')
   async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
      const item = await this.coreMemberService.findBySlug(query, slug);
      if (!item) return this.response.detailFail();
      return this.response.detailSuccess(await this.transformer.transformCoreMemberDetail(item));
   }
}
