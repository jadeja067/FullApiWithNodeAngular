import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent} from "./components/navbar/navbar.component";
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component'

const routes: Routes =[
  {path: '', component: DashboardComponent, children:[
    {path:"", component: HomeComponent},
    {path:"about", component: AboutComponent},
    {path:"contact", component: ContactComponent},
  ]}
]

@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesModule { }
