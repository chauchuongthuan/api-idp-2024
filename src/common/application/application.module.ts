import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeApplicationController } from './admin/beApplication.controller';
import { ApplicationService } from './services/application.service';
import { TransformerApplicationService } from './services/transformerApplication.service';
import { FeApplicationController } from './frontend/feApplication.controller';
import { JobModule } from '../jobs/job.module';

@Module({
   imports: [SchemasModule, ActivityModule, JobModule, EventEmitterModule.forRoot()],
   controllers: [BeApplicationController, FeApplicationController],
   providers: [ApplicationService, TransformerApplicationService],
   exports: [ApplicationService, TransformerApplicationService],
})
export class ApplicationModule {}
