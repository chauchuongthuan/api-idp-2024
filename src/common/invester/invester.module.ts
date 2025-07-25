import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeInvesterController } from './admin/beInvester.controller';
import { InvesterService } from './services/invester.service';
import { TransformerInvesterService } from './services/transformerInvester.service';
import { FeInvesterController } from './frontend/feInvester.controller';
import { CategoryModule } from '../category/category.module';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot(), CategoryModule],
   controllers: [BeInvesterController, FeInvesterController],
   providers: [InvesterService, TransformerInvesterService],
   exports: [InvesterService, TransformerInvesterService],
})
export class InvesterModule {}
