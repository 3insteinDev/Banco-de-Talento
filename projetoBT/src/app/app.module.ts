import { SendMailServiceService } from './services/send-mail-service.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';

//import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormVagasComponent } from './components/adm/form-vagas/form-vagas.component';
import { ListVagasComponent } from './components/adm/list-vagas/list-vagas.component';
import { FormCurriculoComponent } from './components/user/form-curriculo/form-curriculo.component';
import { ListCurriculoComponent } from './components/user/list-curriculo/list-curriculo.component';
import { ViewVagasComponent } from './components/adm/view-vagas/view-vagas.component';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { CadComponent } from './components/cad/cad.component';
import { ViewComponent } from './components/user/view/view.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { DashVagasComponent } from './components/adm/dash-vagas/dash-vagas.component';
import { DashCandidatosComponent } from './components/adm/dash-candidatos/dash-candidatos.component';
import { DashViewCandidatoComponent } from './components/adm/dash-view-candidato/dash-view-candidato.component';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { SuperAdminComponent } from './components/adm/super-admin/super-admin.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PaginaInicialComponent,
    FormVagasComponent,
    ListVagasComponent,
    FormCurriculoComponent,
    ListCurriculoComponent,
    ViewVagasComponent,
    LoginComponent,
    CadComponent,
    ViewComponent,
    SidebarMenuComponent,
    DashVagasComponent,
    DashCandidatosComponent,
    DashViewCandidatoComponent,
    SuperAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    FormsModule,
    CoolSocialLoginButtonsModule,
    ProgressbarModule.forRoot(),
    HttpClientModule
  ],
  providers: [AngularFireAuth, BsModalService, ViewVagasComponent, SendMailServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
