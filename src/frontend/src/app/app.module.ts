import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgIconsModule } from '@ng-icons/core';
import { bootstrapPower } from '@ng-icons/bootstrap-icons';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({ bootstrapPower }),
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
