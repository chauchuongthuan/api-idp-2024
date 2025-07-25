import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './common/auth/auth.module';
import { UserModule } from './common/users/user.module';
import { RolesModule } from './common/roles/roles.module';
import { CustomerModule } from './common/customer/customer.module';
import { CoresModule } from './core/core.module';
import { SchemasModule } from './schemas/schemas.module';
import { PageModule } from './common/page/page.module';
import { SettingModule } from './common/setting/setting.module';
import { CategoryModule } from './common/category/category.module';
import { AuthorModule } from './common/author/author.module';
import { StoryModule } from './common/story/story.module';
import { PostModule } from './common/posts/post.module';
import { ContactModule } from './common/contact/contact.module';
import { SubscriberModule } from './common/subscriber/subscriber.module';
import { MarketingMailModule } from './common/marketingMail/marketingMail.module';
import { EmailModule } from './common/email/email.module';
import { UploadModule } from './common/upload/upload.module';
import { CustomerCareModule } from './common/customerCare/customerCare.module';
import { tokenDrawModule } from './common/tokenDraw/tokenDraw.module';
import { QueueModule } from './common/queues/queues.module';
import { GptModule } from './common/chatgpt/gpt.module';
import { TaskScheduleModule } from './common/taskSchedule/taskSchedule.module';
import { DashboardModule } from './common/dashboard/dashboard.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemModule } from './items/item.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ChatHistoryModule } from './common/chatGPTHistory/chatHistory.module';
import { NotificationModule } from './items/notification/notification.module';
import { ExpertiseModule } from './common/expertise/expertise.module';
import { AwardModule } from './common/award/award.module';
import { InvesterModule } from './common/invester/invester.module';
import { ContactWebsiteModule } from './common/contactWebsite/contactWebsite.module';
import { CommunityModule } from './common/community/community.module';
import { DepartmentModule } from './common/department/department.module';
import { WorkplaceModule } from './common/workplace/workplace.module';
import { PositionLevelModule } from './common/positionLevel/positionLevel.module';
import { EmploymentModule } from './common/employment/employment.module';
import { QualificationModule } from './common/qualification/qualification.module';
import { ExperienceModule } from './common/experience/experience.module';
import { SalaryModule } from './common/salary/salary.module';
import { JobTagModule } from './common/jobTag/jobTag.module';
import { JobModule } from './common/jobs/job.module';
import { CoreMemberModule } from './common/coreMember/coreMember.module';
import { OccupationModule } from './common/occupation/occupation.module';
import { ApplicationModule } from './common/application/application.module';
const queueDriver = process.env.QUEUE_DRIVER;

const imports = [
   ItemModule,
   NotificationModule,
   GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      playground: true,
      context: ({ req }) => ({
         headers: req.headers,
      }),
   }),
   CoresModule,
   SchemasModule,
   AuthModule,
   UserModule,
   RolesModule,
   CustomerModule,
   PageModule,
   SettingModule,
   CategoryModule,
   // AuthorModule,
   // StoryModule,
   // PostModule,
   ContactModule,
   SubscriberModule,
   MarketingMailModule,
   EmailModule,
   UploadModule,
   // CustomerCareModule,
   tokenDrawModule,
   // GptModule,
   TaskScheduleModule,
   DashboardModule,
   // ChatHistoryModule,
   // ExpertiseModule,
   // AwardModule,
   InvesterModule,
   ContactWebsiteModule,
   CommunityModule,
   DepartmentModule,
   WorkplaceModule,
   PositionLevelModule,
   EmploymentModule,
   QualificationModule,
   ExperienceModule,
   SalaryModule,
   JobTagModule,
   JobModule,
   CoreMemberModule,
   OccupationModule,
   ApplicationModule,
];

if (queueDriver == 'redis') imports.push(QueueModule);
@Module({
   imports,
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
