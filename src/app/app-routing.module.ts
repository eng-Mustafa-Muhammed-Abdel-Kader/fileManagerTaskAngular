import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFileComponent } from './components/add-file/add-file.component';
import { DetailsFileComponent } from './components/details-file/details-file.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'add-file', component: AddFileComponent},
  {path: 'home', component: HomeComponent},
  {path: 'details-file', component: DetailsFileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
