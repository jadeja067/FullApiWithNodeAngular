import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent} from "./components/navbar/navbar.component";
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { SubCatListComponent } from './components/sub-cat-list/sub-cat-list.component';

const routes: Routes =[
  {path: '', component: DashboardComponent, children:[
    {path:"", component: HomeComponent},
    {path:"about", component: AboutComponent},
    {path:"contact", component: ContactComponent},
    {path: "product", loadChildren: () => import('./product/product.module').then(mod => mod.ProductModule)}
  ]}
]

@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    SidebarComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]
})
export class PagesModule { }
