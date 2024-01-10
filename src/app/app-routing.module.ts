import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './forms/signin/signin.component';
import { isSignInGuard } from './is-sign-in.guard';

const routes: Routes = [
  {path: "", pathMatch:"full", redirectTo: 'sign'},
  {path: "sign", component: SigninComponent},
  {path: "dashboard", loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule), canActivateChild:[isSignInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
