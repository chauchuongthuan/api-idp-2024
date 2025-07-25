import { Module } from '@nestjs/common';
import { SchemasModule } from '@schemas/schemas.module';
import { ActivityModule } from '@common/activities/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BeJobController } from './admin/beJob.controller';
import { JobService } from './services/job.service';
import { TransformerJobService } from './services/transformerJob.service';
import { FeJobController } from './frontend/feJob.controller';
import { JobTagModule } from '../jobTag/jobTag.module';
import { DepartmentModule } from '../department/department.module';
import { WorkplaceModule } from '../workplace/workplace.module';
import { PositionLevelModule } from '../positionLevel/positionLevel.module';
import { EmploymentModule } from '../employment/employment.module';
import { QualificationModule } from '../qualification/qualification.module';
import { ExperienceModule } from '../experience/experience.module';
import { SalaryModule } from '../salary/salary.module';
import { OccupationModule } from '../occupation/occupation.module';

@Module({
   imports: [
      SchemasModule,
      ActivityModule,
      JobTagModule,
      DepartmentModule,
      WorkplaceModule,
      PositionLevelModule,
      EmploymentModule,
      QualificationModule,
      ExperienceModule,
      SalaryModule,
      OccupationModule,
      EventEmitterModule.forRoot(),
   ],
   controllers: [BeJobController, FeJobController],
   providers: [JobService, TransformerJobService],
   exports: [JobService, TransformerJobService],
})
export class JobModule {}
