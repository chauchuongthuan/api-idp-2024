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
import { ContactService } from '../services/contact.service';
import { TransformerContactService } from '../services/transformerContact.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeContactDto } from '../dto/beContact.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('Contact')
@Controller('contacts')
@UseInterceptors(CoreTransformInterceptor)
export class FeContactController {
   constructor(
      private contactService: ContactService,
      private response: ResponseService,
      private transformer: TransformerContactService,
   ) {}

   @Post()
   @ApiBody({ type: BeContactDto })
   @HasFile()
   async create(@Body() dto: BeContactDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.contactService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformContactDetail(item));
   }
}
