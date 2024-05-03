import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgIconsModule } from '@ng-icons/core';
import {
  bootstrapPower,
  bootstrapFileEarmarkZip,
  bootstrapTrash3Fill,
  bootstrapFileEarmark,
  bootstrapFileEarmarkText,
  bootstrapFileEarmarkPlay,
  bootstrapTrash,
  bootstrapPlusCircleDotted,
} from '@ng-icons/bootstrap-icons';

import { AppComponent } from './app.component';
import { ROUTES } from './routes';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageIndexComponent } from './page-index/page-index.component';
import { PageSignInComponent } from './page-sign-in/page-sign-in.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageMyTasksComponent } from './tasks/page-my-tasks/page-my-tasks.component';
import { interceptorProviders } from './interceptors';
import { TaskGroupComponent } from './tasks/task-group/task-group.component';
import { SiteIconComponent } from './site-icon/site-icon.component';
import { LateralMenuComponent } from './lateral-menu/lateral-menu.component';
import { FileDropComponent } from './file-drop/file-drop.component';
import { FileDropFileComponent } from './file-drop-file/file-drop-file.component';
import { DataFormatPipe } from './data-format.pipe';
import { MediasDisplayComponent } from './medias/medias-display/medias-display.component';
import { MediaDisplayComponent } from './medias/media-display/media-display.component';
import { MediaDetailsComponent } from './medias/media-details/media-details.component';
import { CookieService } from 'ngx-cookie-service';
import { TextMediaOverviewComponent } from './medias/text-media-overview/text-media-overview.component';
import { CreateTaskGroupComponent } from './tasks/create-task-group/create-task-group.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageIndexComponent,
    PageSignInComponent,
    PageRegisterComponent,
    PageMyTasksComponent,
    TaskGroupComponent,
    SiteIconComponent,
    LateralMenuComponent,
    FileDropComponent,
    FileDropFileComponent,
    DataFormatPipe,
    MediasDisplayComponent,
    MediaDisplayComponent,
    MediaDetailsComponent,
    TextMediaOverviewComponent,
    CreateTaskGroupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      bootstrapPower,
      bootstrapFileEarmarkZip,
      bootstrapTrash3Fill,
      bootstrapFileEarmark,
      bootstrapFileEarmarkText,
      bootstrapFileEarmarkPlay,
      bootstrapTrash,
      bootstrapPlusCircleDotted,
    }),
  ],
  providers: [interceptorProviders, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
