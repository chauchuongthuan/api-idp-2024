import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeQualificationController } from './admin/beQualification.controller';
import { QualificationService } from './services/qualification.service';
import { TransformerQualificationService } from './services/transformerQualification.service';
import { FeQualificationController } from './frontend/feQualification.controller';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot()],
   controllers: [BeQualificationController, FeQualificationController],
   providers: [QualificationService, TransformerQualificationService],
   exports: [QualificationService, TransformerQualificationService],
})
export class QualificationModule {}
