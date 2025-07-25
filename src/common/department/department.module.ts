import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeDepartmentController } from './admin/beDepartment.controller';
import { DepartmentService } from './services/department.service';
import { TransformerDepartmentService } from './services/transformerDepartment.service';
import { FeDepartmentController } from './frontend/feDepartment.controller';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot()],
   controllers: [BeDepartmentController, FeDepartmentController],
   providers: [DepartmentService, TransformerDepartmentService],
   exports: [DepartmentService, TransformerDepartmentService],
})
export class DepartmentModule {}
