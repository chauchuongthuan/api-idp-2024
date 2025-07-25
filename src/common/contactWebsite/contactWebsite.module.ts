import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeContactWebsiteController } from './admin/beContactWebsite.controller';
import { ContactWebsiteService } from './services/contactWebsite.service';
import { TransformerContactWebsiteService } from './services/transformerContactWebsite.service';
import { FeContactWebsiteController } from './frontend/feContactWebsite.controller';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot()],
   controllers: [BeContactWebsiteController, FeContactWebsiteController],
   providers: [ContactWebsiteService, TransformerContactWebsiteService],
   exports: [ContactWebsiteService, TransformerContactWebsiteService],
})
export class ContactWebsiteModule {}
