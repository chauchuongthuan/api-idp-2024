import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeCoreMemberController } from './admin/beCoreMember.controller';
import { CoreMemberService } from './services/coreMember.service';
import { TransformerCoreMemberService } from './services/transformerCoreMember.service';
import { FeCoreMemberController } from './frontend/feCoreMember.controller';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot()],
   controllers: [BeCoreMemberController, FeCoreMemberController],
   providers: [CoreMemberService, TransformerCoreMemberService],
   exports: [CoreMemberService, TransformerCoreMemberService],
})
export class CoreMemberModule {}
