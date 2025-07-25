import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeOccupationController } from './admin/beOccupation.controller';
import { OccupationService } from './services/occupation.service';
import { TransformerOccupationService } from './services/transformerOccupation.service';
import { FeOccupationController } from './frontend/feOccupation.controller';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot()],
   controllers: [BeOccupationController, FeOccupationController],
   providers: [OccupationService, TransformerOccupationService],
   exports: [OccupationService, TransformerOccupationService],
})
export class OccupationModule {}
