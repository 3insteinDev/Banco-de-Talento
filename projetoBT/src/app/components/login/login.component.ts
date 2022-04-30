import { first, firstValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  form: FormGroup;
  fieldTextType: boolean = false

  constructor(
    private auth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(4)]],
    });
  }


  ngOnInit(): void {
    this.redireciona()
  }

  // checar se o usuário está logado, se estiver logado redireciona pra página inicial
  // se não estiver, permite que vá para o login
  checkLoggedIn() {
    return firstValueFrom(this.auth.authState.pipe(first()))
  }

  async redireciona() {
    const userLog = await this.checkLoggedIn()

    if (userLog) {
      console.log(userLog);
      this.router.navigate(['/'])

    } else {
      console.log('Não tem ninguem logado');

    }

  }





  alertMessage = ''
  fazerLogin() {
    this.auth
      .signInWithEmailAndPassword(this.form.value.email, this.form.value.senha)
      .then((user: any) => {
        console.log(user);
        this.router.navigate(['/'])
      })
      .catch((error: any) => {
        this.alertMessage = 'Usuário ou senha incorretos'
        console.log(error);
      });
  }


  // mostrar e esconder senha
  toggleType() {
    this.fieldTextType = !this.fieldTextType

  }

}
