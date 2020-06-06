import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCreationComponent } from './list-creation/list-creation.component';
import { LotteryComponent } from './lottery/lottery.component';
import { ParticipantService } from './participant.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ElectronComponent } from './header/electron/electron.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCreationComponent,
    LotteryComponent,
    NavbarComponent,
    ElectronComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ParticipantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
