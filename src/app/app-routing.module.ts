import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LotteryComponent } from './lottery/lottery.component';
import { ListCreationComponent } from './list-creation/list-creation.component';
import { WinnersListComponent } from './winners-list/winners-list.component';


const routes: Routes = [
  {path: '', component: LotteryComponent},
  {path: 'list-creation', component: ListCreationComponent},
  {path: 'winners-list', component: WinnersListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
