import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BePositionLevelController } from './admin/bePositionLevel.controller';
import { PositionLevelService } from './services/positionLevel.service';
import { TransformerPositionLevelService } from './services/transformerPositionLevel.service';
import { FePositionLevelController } from './frontend/fePositionLevel.controller';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot()],
   controllers: [BePositionLevelController, FePositionLevelController],
   providers: [PositionLevelService, TransformerPositionLevelService],
   exports: [PositionLevelService, TransformerPositionLevelService],
})
export class PositionLevelModule {}
