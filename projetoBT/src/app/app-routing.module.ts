import { SuperAdminGuard } from './guards/super-admin.guard';
import { SuperAdminComponent } from './components/adm/super-admin/super-admin.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { ListCurriculoComponent } from './components/user/list-curriculo/list-curriculo.component';
import { FormCurriculoComponent } from './components/user/form-curriculo/form-curriculo.component';
import { ViewVagasComponent } from './components/adm/view-vagas/view-vagas.component';
import { ListVagasComponent } from './components/adm/list-vagas/list-vagas.component';
import { FormVagasComponent } from './components/adm/form-vagas/form-vagas.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadComponent } from './components/cad/cad.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { ViewComponent } from './components/user/view/view.component';
import { DashVagasComponent } from './components/adm/dash-vagas/dash-vagas.component';
import { DashCandidatosComponent } from './components/adm/dash-candidatos/dash-candidatos.component';
import { DashViewCandidatoComponent } from './components/adm/dash-view-candidato/dash-view-candidato.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cad', component: CadComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: PaginaInicialComponent },
  { path: 'adm/dash/superAdmin', component: SuperAdminComponent, canActivate: [SuperAdminGuard] },
  { path: 'adm/viewVagas', component: ViewVagasComponent, canActivate: [AdminGuard] },
  { path: 'adm/dash/vagas', component: DashVagasComponent, canActivate: [AdminGuard] },
  { path: 'adm/dash/vagas/:id', component: DashCandidatosComponent, canActivate: [AdminGuard] },
  { path: 'adm/dash/candidato/:idVaga/:id', component: DashViewCandidatoComponent, canActivate: [AdminGuard] },
  { path: 'adm/dash/candidato/:id', component: DashViewCandidatoComponent, canActivate: [AdminGuard] },
  { path: 'adm/editVagas', component: FormVagasComponent, canActivate: [AdminGuard] },
  { path: 'adm/listUser', component: ListCurriculoComponent, canActivate: [AdminGuard] },
  { path: 'user/view', component: ViewComponent, canActivate: [UserGuard] },
  { path: 'user/edit', component: FormCurriculoComponent, canActivate: [UserGuard] },



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
