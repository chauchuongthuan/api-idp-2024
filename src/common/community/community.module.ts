import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeCommunityController } from './admin/beCommunity.controller';
import { CommunityService } from './services/community.service';
import { TransformerCommunityService } from './services/transformerCommunity.service';
import { FeCommunityController } from './frontend/feCommunity.controller';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot()],
   controllers: [BeCommunityController, FeCommunityController],
   providers: [CommunityService, TransformerCommunityService],
   exports: [CommunityService, TransformerCommunityService],
})
export class CommunityModule {}
