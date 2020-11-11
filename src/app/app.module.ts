import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCreationComponent } from './list-creation/list-creation.component';
import { LotteryComponent } from './lottery/lottery.component';
import { ParticipantService } from './participant.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ElectronComponent } from './header/electron/electron.component';
import { WinnersListComponent } from './winners-list/winners-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCreationComponent,
    LotteryComponent,
    NavbarComponent,
    ElectronComponent,
    WinnersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ParticipantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
