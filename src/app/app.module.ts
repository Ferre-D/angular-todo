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

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AppComponent, HomeComponent, MenuComponent, ProjectComponent, OverviewComponent, ProjectDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
