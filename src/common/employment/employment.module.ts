import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeEmploymentController } from './admin/beEmployment.controller';
import { EmploymentService } from './services/employment.service';
import { TransformerEmploymentService } from './services/transformerEmployment.service';
import { FeEmploymentController } from './frontend/feEmployment.controller';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot()],
   controllers: [BeEmploymentController, FeEmploymentController],
   providers: [EmploymentService, TransformerEmploymentService],
   exports: [EmploymentService, TransformerEmploymentService],
})
export class EmploymentModule {}
