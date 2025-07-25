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
import { ApplicationService } from '../services/application.service';
import { TransformerApplicationService } from '../services/transformerApplication.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeApplicationDto } from '../dto/beApplication.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('Application')
@Controller('applications')
@UseInterceptors(CoreTransformInterceptor)
export class FeApplicationController {
   constructor(
      private applicationService: ApplicationService,
      private response: ResponseService,
      private transformer: TransformerApplicationService,
   ) {}

   @Post()
   @ApiBody({ type: BeApplicationDto })
   @HasFile()
   async create(@Body() dto: BeApplicationDto, @UploadedFiles() files: Record<any, any>): Promise<any> {
      const item = await this.applicationService.create(dto, files);
      if (!item) return this.response.createdFail();
      return this.response.createdSuccess(await this.transformer.transformApplicationDetail(item));
   }
}
