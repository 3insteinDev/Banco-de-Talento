import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
// import { ValidaCadastro } from 'src/app/validations/validaCadastro';

@Component({
  selector: 'app-cad',
  templateUrl: './cad.component.html',
  styleUrls: ['./cad.component.css']
})
export class CadComponent implements OnInit {

  fieldTextType: boolean = false


  // decalaração do formGroup
  formCadastro: FormGroup
  constructor(public fb: FormBuilder, public authService: AuthService) {
    // inicializar o formGroup de cadastro e as variáveis
    this.formCadastro = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      senhaCheck: ['', [Validators.required]],
      termos: ['', [Validators.required]]
      // token: ['']
    }, { validator: this.checkSenhas }
    )

  }

  ngOnInit(): void {
  }

  // para deixar o código mais limpo, iremos utilizar getters
  get email() { return this.formCadastro.get('email') }
  get senha() { return this.formCadastro.get('senha') }
  get senhaCheck() { return this.formCadastro.get('senhaCheck') }


  // chamar a função de cadastro para quando o form for submetido
  signUp() {
    return this.authService.emailCad(this.formCadastro.value)
  }

  // mostrar e esconder senha
  toggleType() {
    this.fieldTextType = !this.fieldTextType

  }


  checkSenhas(group: FormGroup) {
    const senha = group.controls['senha'].value;
    const senhaCheck = group.controls['senhaCheck'].value;
    if (senha === senhaCheck) {

      return null
    } else {
      return { invalid: true }
    }

  }

}
