import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { DashboardService } from './services/dashboard.service';
import { DashboardController } from './admin/dashboard.controller';
import { ActivityModule } from '@common/activities/activity.module';
import { PageModule } from '../page/page.module';

@Module({
   imports: [SchemasModule, ActivityModule, PageModule],
   controllers: [DashboardController],
   providers: [DashboardService],
   exports: [DashboardService],
})
export class DashboardModule {}
