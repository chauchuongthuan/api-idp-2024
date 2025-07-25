import { Injectable } from '@nestjs/common';
@Injectable()
export class PermissionService {
   static permissions;

   constructor() {
      PermissionService.permissions = {
         allow: [
            {
               group: 'Log',
               items: {
                  [Permissions.log_list]: 'View',
               },
            },
            {
               group: 'Setting',
               items: {
                  [Permissions.setting_list]: 'View',
                  [Permissions.setting_update]: 'Update',
               },
            },
            {
               group: 'Dashboard',
               items: {
                  [Permissions.dashboard_list]: 'List Dashboard',
               },
            },
            {
               group: 'Activity',
               items: {
                  [Permissions.activity_list]: 'Activity List',
               },
            },
            {
               group: 'Filemanager',
               items: {
                  [Permissions.file_manager_list]: 'List file manager',
                  [Permissions.file_manager_detail]: 'Detail file manager',
                  [Permissions.file_manager_add]: 'Add file manager',
                  [Permissions.file_manager_edit]: 'Edit file manager',
                  [Permissions.file_manager_delete]: 'Delete file manager',
               },
            },
            {
               group: 'User',
               items: {
                  [Permissions.user_list]: 'List user',
                  // [Permissions.user_detail]: 'Detail user',
                  [Permissions.user_add]: 'Add user',
                  [Permissions.user_edit]: 'Edit user',
                  [Permissions.user_delete]: 'Delete user',
               },
            },
            {
               group: 'Role',
               items: {
                  [Permissions.role_list]: 'List role',
                  // [Permissions.role_detail]: 'Detail role',
                  [Permissions.role_add]: 'Add role',
                  [Permissions.role_edit]: 'Edit role',
                  [Permissions.role_delete]: 'Delete role',
               },
            },
            {
               group: 'Post',
               items: {
                  [Permissions.post_list]: 'List Post',
                  [Permissions.post_detail]: 'Detail Post',
                  [Permissions.post_add]: 'Add Post',
                  [Permissions.post_edit]: 'Edit Post',
                  [Permissions.post_delete]: 'Delete Post',
                  // [Permissions.post_change_status]: 'Change status Post',
               },
            },
            {
               group: 'Category Post',
               items: {
                  [Permissions.post_category_list]: 'List Category Post',
                  // [Permissions.post_category_detail]: 'Detail Category Post',
                  [Permissions.post_category_add]: 'Add Category Post',
                  [Permissions.post_category_edit]: 'Edit Category Post',
                  [Permissions.post_category_delete]: 'Delete Category Post',
               },
            },
            {
               group: 'Tag',
               items: {
                  [Permissions.tag_list]: 'List Tag',
                  // [Permissions.tag_detail]: 'Detail Tag',
                  [Permissions.tag_add]: 'Add Tag',
                  [Permissions.tag_edit]: 'Edit Tag',
                  [Permissions.tag_delete]: 'Delete Tag',
               },
            },
            // {
            //    group: 'Post View Status',
            //    items: {
            //       [Permissions.post_view_self]: 'View Selft',
            //       [Permissions.post_view_status_1]: 'New',
            //       [Permissions.post_view_status_2]: 'In-Review',
            //       [Permissions.post_view_status_3]: 'Censorship',
            //       [Permissions.post_view_status_4]: 'Publish',
            //    },
            // },
            // {
            //    group: 'Post Default Status',
            //    items: {
            //       [Permissions.post_default_status_1]: 'New',
            //       [Permissions.post_default_status_2]: 'In-Review',
            //       [Permissions.post_default_status_3]: 'Censorship',
            //       [Permissions.post_default_status_4]: 'Publish',
            //    },
            // },
            {
               group: 'Category Invester',
               items: {
                  [Permissions.category_list]: 'List Category Invester',
                  // [Permissions.category_detail]: 'Detail Category Invester',
                  [Permissions.category_add]: 'Add Category Invester',
                  [Permissions.category_edit]: 'Edit Category Invester',
                  [Permissions.category_delete]: 'Delete Category Invester',
               },
            },
            {
               group: 'Invester',
               items: {
                  [Permissions.invester_list]: 'List Invester',
                  // [Permissions.invester_detail]: 'Detail Invester',
                  [Permissions.invester_add]: 'Add Invester',
                  [Permissions.invester_edit]: 'Edit Invester',
                  [Permissions.invester_delete]: 'Delete Invester',
               },
            },
            {
               group: 'Page',
               items: {
                  [Permissions.page_list]: 'List Page',
                  [Permissions.page_detail]: 'Detail Page',
                  // [Permissions.page_add]: 'Add Page',
                  [Permissions.page_edit]: 'Edit Page',
                  // [Permissions.page_delete]: 'Delete Page',
               },
            },
            {
               group: 'Contact',
               items: {
                  [Permissions.contact_list]: 'List Contact',
                  [Permissions.contact_detail]: 'Detail Contact',
                  // [Permissions.contact_add]: 'Add Contact',
                  // [Permissions.contact_edit]: 'Edit Contact',
                  [Permissions.contact_delete]: 'Delete Contact',
               },
            },
            {
               group: 'Contact Website',
               items: {
                  [Permissions.contact_website_list]: 'List Contact Website',
                  [Permissions.contact_website_detail]: 'Detail Contact Website',
                  // [Permissions.contact_website_add]: 'Add Contact Website',
                  // [Permissions.contact_website_edit]: 'Edit Contact Website',
                  [Permissions.contact_website_delete]: 'Delete Contact Website',
               },
            },
            {
               group: 'Community Activities',
               items: {
                  [Permissions.community_list]: 'List Community',
                  // [Permissions.community_detail]: 'Detail Community',
                  [Permissions.community_add]: 'Add Community',
                  [Permissions.community_edit]: 'Edit Community',
                  [Permissions.community_delete]: 'Delete Community',
               },
            },
            {
               group: 'Department',
               items: {
                  [Permissions.department_list]: 'List Department',
                  // [Permissions.department_detail]: 'Detail Department',
                  [Permissions.department_add]: 'Add Department',
                  [Permissions.department_edit]: 'Edit Department',
                  [Permissions.department_delete]: 'Delete Department',
               },
            },
            {
               group: 'Occupation',
               items: {
                  [Permissions.occupation_list]: 'List Occupation',
                  // [Permissions.occupation_detail]: 'Detail Occupation',
                  [Permissions.occupation_add]: 'Add Occupation',
                  [Permissions.occupation_edit]: 'Edit Occupation',
                  [Permissions.occupation_delete]: 'Delete Occupation',
               },
            },
            {
               group: 'Workplace',
               items: {
                  [Permissions.workplace_list]: 'List Workplace',
                  // [Permissions.workplace_detail]: 'Detail Workplace',
                  [Permissions.workplace_add]: 'Add Workplace',
                  [Permissions.workplace_edit]: 'Edit Workplace',
                  [Permissions.workplace_delete]: 'Delete Workplace',
               },
            },
            {
               group: 'Position Level',
               items: {
                  [Permissions.position_level_list]: 'List Position Level',
                  // [Permissions.position_level_detail]: 'Detail Position Level',
                  [Permissions.position_level_add]: 'Add Position Level',
                  [Permissions.position_level_edit]: 'Edit Position Level',
                  [Permissions.position_level_delete]: 'Delete Position Level',
               },
            },
            {
               group: 'Employment',
               items: {
                  [Permissions.employment_list]: 'List Employment',
                  // [Permissions.employment_detail]: 'Detail Employment',
                  [Permissions.employment_add]: 'Add Employment',
                  [Permissions.employment_edit]: 'Edit Employment',
                  [Permissions.employment_delete]: 'Delete Employment',
               },
            },
            {
               group: 'Qualification',
               items: {
                  [Permissions.qualification_list]: 'List Qualification',
                  // [Permissions.qualification_detail]: 'Detail Qualification',
                  [Permissions.qualification_add]: 'Add Qualification',
                  [Permissions.qualification_edit]: 'Edit Qualification',
                  [Permissions.qualification_delete]: 'Delete Qualification',
               },
            },
            {
               group: 'Experience',
               items: {
                  [Permissions.experience_list]: 'List Experience',
                  // [Permissions.experience_detail]: 'Detail Experience',
                  [Permissions.experience_add]: 'Add Experience',
                  [Permissions.experience_edit]: 'Edit Experience',
                  [Permissions.experience_delete]: 'Delete Experience',
               },
            },
            {
               group: 'Salary',
               items: {
                  [Permissions.salary_list]: 'List Salary',
                  // [Permissions.salary_detail]: 'Detail Salary',
                  [Permissions.salary_add]: 'Add Salary',
                  [Permissions.salary_edit]: 'Edit Salary',
                  [Permissions.salary_delete]: 'Delete Salary',
               },
            },
            {
               group: 'Job Tag',
               items: {
                  [Permissions.job_tag_list]: 'List Job Tag',
                  // [Permissions.job_tag_detail]: 'Detail Job Tag',
                  [Permissions.job_tag_add]: 'Add Job Tag',
                  [Permissions.job_tag_edit]: 'Edit Job Tag',
                  [Permissions.job_tag_delete]: 'Delete Job Tag',
               },
            },
            {
               group: 'Job',
               items: {
                  [Permissions.job_list]: 'List Job',
                  [Permissions.job_detail]: 'Detail Job',
                  [Permissions.job_add]: 'Add Job',
                  [Permissions.job_edit]: 'Edit Job',
                  [Permissions.job_delete]: 'Delete Job',
               },
            },
            {
               group: 'Application',
               items: {
                  [Permissions.application_list]: 'List Application',
                  [Permissions.application_detail]: 'Detail Application',
                  // [Permissions.application_add]: 'Add Application',
                  // [Permissions.application_edit]: 'Edit Application',
                  [Permissions.application_delete]: 'Delete Application',
               },
            },
            {
               group: 'Core Member',
               items: {
                  [Permissions.core_member_list]: 'List Core Member',
                  // [Permissions.core_member_detail]: 'Detail Core Member',
                  [Permissions.core_member_add]: 'Add Core Member',
                  [Permissions.core_member_edit]: 'Edit Core Member',
                  [Permissions.core_member_delete]: 'Delete Core Member',
               },
            },
         ],
         except: [],
      };
   }
}

export enum Permissions {
   /*
    Setting
     */
   setting_list = 'setting_list',
   setting_update = 'setting_update',

   /*
    File manager
    */
   file_manager_list = 'file_manager_list',
   file_manager_detail = 'file_manager_detail',
   file_manager_add = 'file_manager_add',
   file_manager_edit = 'file_manager_edit',
   file_manager_delete = 'file_manager_delete',

   /*
    User
     */
   user_list = 'user_list',
   user_detail = 'user_detail',
   user_add = 'user_add',
   user_edit = 'user_edit',
   user_delete = 'user_delete',

   /*
    Role
     */
   role_list = 'role_list',
   role_detail = 'role_detail',
   role_add = 'role_add',
   role_edit = 'role_edit',
   role_delete = 'role_delete',

   /*
    Customer
    */
   customer_list = 'customer_list',
   customer_detail = 'customer_detail',
   customer_add = 'customer_add',
   customer_edit = 'customer_edit',
   customer_delete = 'customer_delete',

   /*
    Author
    */
   author_list = 'author_list',
   author_detail = 'author_detail',
   author_add = 'author_add',
   author_edit = 'author_edit',
   author_delete = 'author_delete',

   /*
    Author
    */
   story_list = 'story_list',
   story_detail = 'story_detail',
   story_add = 'story_add',
   story_edit = 'story_edit',
   story_delete = 'story_delete',

   /*
    Log
    */
   log_list = 'log_list',

   /*
    Category
    */
   category_list = 'category_list',
   category_detail = 'category_detail',
   category_add = 'category_add',
   category_edit = 'category_edit',
   category_delete = 'category_delete',

   /*
    Invester
    */
   invester_list = 'invester_list',
   invester_detail = 'invester_detail',
   invester_add = 'invester_add',
   invester_edit = 'invester_edit',
   invester_delete = 'invester_delete',

   /*
    * Tag
    * */
   tag_list = 'tag_list',
   tag_detail = 'tag_detail',
   tag_add = 'tag_add',
   tag_edit = 'tag_edit',
   tag_delete = 'tag_delete',

   /*
    * Post Category
    * */
   post_category_list = 'post_category_list',
   post_category_detail = 'post_category_detail',
   post_category_add = 'post_category_add',
   post_category_edit = 'post_category_edit',
   post_category_delete = 'post_category_delete',

   /*
    * Post Comment
    * */
   post_comment_list = 'post_comment_list',
   post_comment_detail = 'post_comment_detail',
   post_comment_add = 'post_comment_add',
   post_comment_edit = 'post_comment_edit',
   post_comment_delete = 'post_comment_delete',

   /*
    * Post
    * */
   post_list = 'post_list',
   post_detail = 'post_detail',
   post_add = 'post_add',
   post_edit = 'post_edit',
   post_delete = 'post_delete',
   // post_change_status = 'post_change_status',

   post_view_self = 'post_view_self',
   post_view_status_1 = 'post_view_status_1',
   post_view_status_2 = 'post_view_status_2',
   post_view_status_3 = 'post_view_status_3',
   post_view_status_4 = 'post_view_status_4',

   post_default_status_1 = 'post_default_status_1',
   post_default_status_2 = 'post_default_status_2',
   post_default_status_3 = 'post_default_status_3',
   post_default_status_4 = 'post_default_status_4',

   /*
    Community
    */
   community_list = 'community_list',
   community_detail = 'community_detail',
   community_add = 'community_add',
   community_edit = 'community_edit',
   community_delete = 'community_delete',

   /*
    Department
    */
   department_list = 'department_list',
   department_detail = 'department_detail',
   department_add = 'department_add',
   department_edit = 'department_edit',
   department_delete = 'department_delete',

   /*
    Workplace
    */
   workplace_list = 'workplace_list',
   workplace_detail = 'workplace_detail',
   workplace_add = 'workplace_add',
   workplace_edit = 'workplace_edit',
   workplace_delete = 'workplace_delete',

   /*
    Position Level
    */
   position_level_list = 'position_level_list',
   position_level_detail = 'position_level_detail',
   position_level_add = 'position_level_add',
   position_level_edit = 'position_level_edit',
   position_level_delete = 'position_level_delete',

   /*
    Employment
    */
   employment_list = 'employment_list',
   employment_detail = 'employment_detail',
   employment_add = 'employment_add',
   employment_edit = 'employment_edit',
   employment_delete = 'employment_delete',

   /*
    Qualification
    */
   qualification_list = 'qualification_list',
   qualification_detail = 'qualification_detail',
   qualification_add = 'qualification_add',
   qualification_edit = 'qualification_edit',
   qualification_delete = 'qualification_delete',

   /*
    Experience
    */
   experience_list = 'experience_list',
   experience_detail = 'experience_detail',
   experience_add = 'experience_add',
   experience_edit = 'experience_edit',
   experience_delete = 'experience_delete',

   /*
    Salary
    */
   salary_list = 'salary_list',
   salary_detail = 'salary_detail',
   salary_add = 'salary_add',
   salary_edit = 'salary_edit',
   salary_delete = 'salary_delete',

   /*
    Job Tag
    */
   job_tag_list = 'job_tag_list',
   job_tag_detail = 'job_tag_detail',
   job_tag_add = 'job_tag_add',
   job_tag_edit = 'job_tag_edit',
   job_tag_delete = 'job_tag_delete',

   /*
    Occupation
    */
   occupation_list = 'occupation_list',
   occupation_detail = 'occupation_detail',
   occupation_add = 'occupation_add',
   occupation_edit = 'occupation_edit',
   occupation_delete = 'occupation_delete',

   /*
    Job
    */
   job_list = 'job_list',
   job_detail = 'job_detail',
   job_add = 'job_add',
   job_edit = 'job_edit',
   job_delete = 'job_delete',

   /*
    Application
    */
   application_list = 'application_list',
   application_detail = 'application_detail',
   application_add = 'application_add',
   application_edit = 'application_edit',
   application_delete = 'application_delete',

   /*
    Core Member
    */
   core_member_list = 'core_member_list',
   core_member_detail = 'core_member_detail',
   core_member_add = 'core_member_add',
   core_member_edit = 'core_member_edit',
   core_member_delete = 'core_member_delete',

   /*
    Chapter
    */
   chapter_list = 'chapter_list',
   chapter_detail = 'chapter_detail',
   chapter_add = 'chapter_add',
   chapter_edit = 'chapter_edit',
   chapter_delete = 'chapter_delete',

   /*
    Like
    */
   like_list = 'like_list',
   like_detail = 'like_detail',
   like_add = 'like_add',
   like_edit = 'like_edit',
   like_delete = 'like_delete',

   /*
    Follow
    */
   follow_list = 'follow_list',
   follow_detail = 'follow_detail',
   follow_add = 'follow_add',
   follow_edit = 'follow_edit',
   follow_delete = 'follow_delete',

   /*
    Signal
    */
   signal_list = 'signal_list',
   signal_detail = 'signal_detail',
   signal_add = 'signal_add',
   signal_edit = 'signal_edit',
   signal_delete = 'signal_delete',

   /*
    Page
    */
   page_list = 'page_list',
   page_detail = 'page_detail',
   page_add = 'page_add',
   page_edit = 'page_edit',
   page_delete = 'page_delete',

   /*
    Keyword
    */
   keyword_list = 'keyword_list',
   keyword_detail = 'keyword_detail',
   keyword_add = 'keyword_add',
   keyword_edit = 'keyword_edit',
   keyword_delete = 'keyword_delete',

   /*
    Message
    */
   message_list = 'message_list',
   message_detail = 'message_detail',
   message_add = 'message_add',
   message_edit = 'message_edit',
   message_delete = 'message_delete',

   /*
    History
    */
   history_list = 'history_list',
   history_detail = 'history_detail',
   history_add = 'history_add',
   history_edit = 'history_edit',
   history_delete = 'history_delete',

   /*
    Dashboard
    */
   dashboard_list = 'dashboard_list',

   /*
    Active
    */
   activity_list = 'activity_list',

   /*
    History
    */
   cron_list = 'cron_list',
   cron_detail = 'cron_detail',
   cron_add = 'cron_add',
   cron_edit = 'cron_edit',
   cron_delete = 'cron_delete',

   /*
    Contact
    */
   contact_list = 'contact_list',
   contact_detail = 'contact_detail',
   contact_add = 'contact_add',
   contact_edit = 'contact_edit',
   contact_delete = 'contact_delete',

   /*
    Contact website
    */
   contact_website_list = 'contact_website_list',
   contact_website_detail = 'contact_website_detail',
   contact_website_add = 'contact_website_add',
   contact_website_edit = 'contact_website_edit',
   contact_website_delete = 'contact_website_delete',
   /*
    Subscriber
    */
   subscriber_list = 'subscriber_list',
   subscriber_detail = 'subscriber_detail',
   subscriber_add = 'subscriber_add',
   subscriber_edit = 'subscriber_edit',
   subscriber_delete = 'subscriber_delete',

   /*
    * Mail Schedule
    * */
   mail_schedule_list = 'mail_schedule_list',
   mail_schedule_detail = 'mail_schedule_detail',
   mail_schedule_add = 'mail_schedule_add',
   mail_schedule_edit = 'mail_schedule_edit',
   mail_schedule_delete = 'mail_schedule_delete',
   mail_schedule_change_status = 'mail_schedule_change_status',

   /*
    * Mail List
    * */
   mail_list_list = 'mail_list_list',
   mail_list_detail = 'mail_list_detail',
   mail_list_add = 'mail_list_add',
   mail_list_edit = 'mail_list_edit',
   mail_list_delete = 'mail_list_delete',
   mail_list_change_status = 'mail_list_change_status',

   /*
    * Interest
    * */
   interest_list = 'interest_list',
   interest_detail = 'interest_detail',
   interest_add = 'interest_add',
   interest_edit = 'interest_edit',
   interest_delete = 'interest_delete',

   /*
    Customer Care
    */
   customerCare_list = 'customerCare_list',
   customerCare_detail = 'customerCare_detail',
   customerCare_add = 'customerCare_add',
   customerCare_edit = 'customerCare_edit',
   customerCare_delete = 'customerCare_delete',

   chatgpt = 'chatgpt',
}
