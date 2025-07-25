import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeSalaryController } from './admin/beSalary.controller';
import { SalaryService } from './services/salary.service';
import { TransformerSalaryService } from './services/transformerSalary.service';
import { FeSalaryController } from './frontend/feSalary.controller';

@Module({
   imports: [SchemasModule, ActivityModule, EventEmitterModule.forRoot()],
   controllers: [BeSalaryController, FeSalaryController],
   providers: [SalaryService, TransformerSalaryService],
   exports: [SalaryService, TransformerSalaryService],
})
export class SalaryModule {}
