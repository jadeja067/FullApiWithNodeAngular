import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent} from "./components/navbar/navbar.component";
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'

const routes: Routes =[
  {path: '', component: DashboardComponent, children:[
    {path:"", component: HomeComponent},
    {path:"about", component: AboutComponent},
    {path:"contact", component: ContactComponent},
    {path: "add-product", loadChildren: () => import('./components/add-product/add-product.module').then(mod => mod.AddProductModule)}
  ]}
]

@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesModule { }
