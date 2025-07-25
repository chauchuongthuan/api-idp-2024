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
import { ContactWebsiteService } from '../services/contactWebsite.service';
import { TransformerContactWebsiteService } from '../services/transformerContactWebsite.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeContactWebsiteDto } from '../dto/beContactWebsite.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('ContactWebsite')
@Controller('contactWebsites')
@UseInterceptors(CoreTransformInterceptor)
export class FeContactWebsiteController {
   constructor(
      private contactWebsiteService: ContactWebsiteService,
      private response: ResponseService,
      private transformer: TransformerContactWebsiteService,
   ) {}

   @Post()
   @ApiBody({ type: BeContactWebsiteDto })
   @HasFile()
   async create(@Body() dto: BeContactWebsiteDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.contactWebsiteService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformContactWebsiteDetail(item));
   }
}
