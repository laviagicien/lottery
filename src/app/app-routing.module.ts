import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LotteryComponent } from './lottery/lottery.component';
import { ListCreationComponent } from './list-creation/list-creation.component';


const routes: Routes = [
  {path: '', component: LotteryComponent},
  {path: 'list-creation', component: ListCreationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
