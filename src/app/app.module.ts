import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProjectComponent } from './project/project.component';
import { OverviewComponent } from './overview/overview.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './project-detail/todo/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubtaskComponent } from './project-detail/todo/subtask/subtask.component';
import { NgxColorsModule } from 'ngx-colors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ProjectComponent,
    OverviewComponent,
    ProjectDetailComponent,
    TodoComponent,
    SubtaskComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NgxColorsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
