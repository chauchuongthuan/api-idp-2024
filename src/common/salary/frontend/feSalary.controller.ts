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
import { SalaryService } from '../services/salary.service';
import { TransformerSalaryService } from '../services/transformerSalary.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeSalaryDto } from '../dto/beSalary.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('Salary')
@Controller('salaries')
@UseInterceptors(CoreTransformInterceptor)
export class FeSalaryController {
   constructor(
      private salaryService: SalaryService,
      private response: ResponseService,
      private transformer: TransformerSalaryService,
   ) {}

   @Get()
   @DefaultListQuery()
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.salaryService.findAll(query);
      return this.response.fetchListSuccess(await this.transformer.transformSalaryList(items));
   }

   // @Get(':slug')
   // async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
   //    const item = await this.salaryService.findBySlug(query, slug);
   //    if (!item) return this.response.detailFail();
   //    return this.response.detailSuccess(await this.transformer.transformSalaryDetail(item));
   // }
}
