import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeWorkplaceController } from './admin/beWorkplace.controller';
import { WorkplaceService } from './services/workplace.service';
import { TransformerWorkplaceService } from './services/transformerWorkplace.service';
import { FeWorkplaceController } from './frontend/feWorkplace.controller';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot()],
   controllers: [BeWorkplaceController, FeWorkplaceController],
   providers: [WorkplaceService, TransformerWorkplaceService],
   exports: [WorkplaceService, TransformerWorkplaceService],
})
export class WorkplaceModule {}
