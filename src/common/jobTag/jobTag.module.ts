import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeJobTagController } from './admin/beJobTag.controller';
import { JobTagService } from './services/jobTag.service';
import { TransformerJobTagService } from './services/transformerJobTag.service';
import { FeJobTagController } from './frontend/feJobTag.controller';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot()],
   controllers: [BeJobTagController, FeJobTagController],
   providers: [JobTagService, TransformerJobTagService],
   exports: [JobTagService, TransformerJobTagService],
})
export class JobTagModule {}
