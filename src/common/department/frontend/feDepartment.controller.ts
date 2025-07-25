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
import { DepartmentService } from '../services/department.service';
import { TransformerDepartmentService } from '../services/transformerDepartment.service';
import { DefaultListQuery } from '@src/core/decorators/defaultListQuery.decorator';
import { BeDepartmentDto } from '../dto/beDepartment.dto';
import { HasFile } from '@src/core/decorators/hasFile.decorator';

@ApiTags('Department')
@Controller('departments')
@UseInterceptors(CoreTransformInterceptor)
export class FeDepartmentController {
   constructor(
      private departmentService: DepartmentService,
      private response: ResponseService,
      private transformer: TransformerDepartmentService,
   ) {}

   @Get()
   @DefaultListQuery()
   async getAll(@Query() query: Record<string, any>): Promise<any> {
      const items = await this.departmentService.findAll(query);
      return this.response.fetchListSuccess(await this.transformer.transformDepartmentList(items));
   }

   // @Get(':slug')
   // async findById(@Param('slug') slug: string, @Query() query: Record<string, any>): Promise<any> {
   //    const item = await this.departmentService.findBySlug(query, slug);
   //    if (!item) return this.response.detailFail();
   //    return this.response.detailSuccess(await this.transformer.transformDepartmentDetail(item));
   // }
}
