import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeExperienceController } from './admin/beExperience.controller';
import { ExperienceService } from './services/experience.service';
import { TransformerExperienceService } from './services/transformerExperience.service';
import { FeExperienceController } from './frontend/feExperience.controller';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot()],
   controllers: [BeExperienceController, FeExperienceController],
   providers: [ExperienceService, TransformerExperienceService],
   exports: [ExperienceService, TransformerExperienceService],
})
export class ExperienceModule {}
