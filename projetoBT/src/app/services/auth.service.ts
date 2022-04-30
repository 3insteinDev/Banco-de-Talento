import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// imports específicos do do google
import firebase from 'firebase/compat/app';



import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {
    // se o usuário estiver logado vamos pegar os dados do firestore
    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          console.log('achei user');

          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          console.log('NÃO achei user');

          return of(null);
        }
      })
    );
  }

  ///////////// autenticação de email e senha //////////////

  // rotina para cadastro de novo email e senha
  // emailCad(user: any) {
  //   return new Promise<any>((res, rej) => {
  //     this.afAuth.createUserWithEmailAndPassword(user.email, user.senha).then((res: any) => {
  //       res(res);
  //     },
  //       (err: any) => rej(err))
  //   })
  // }

  //////////////////// ROTINA PARA CADASTRO DE EMAIL E SENHA
  async emailCad(value: any) {
    try {
      const data = await this.afAuth.createUserWithEmailAndPassword(value.email, value.senha);
      // user => {
      // // para criar o documento inicial na collection
      console.log('uid', data.user?.uid);
      this.router.navigate(['/']);
      // return this.afStore.collection('users').doc(data.user?.uid).set({ email: data.user?.email })
      return this.SetUserDoc(data)
    } catch (error) {
      this.router.navigate(['/login']);
      return this.handleError(error);
    }

  }



  // atualiza as informações no documento do usuário
  updateUserDoc(user: User, data: any) {
    return this.afStore.doc(`users/${user.uid}`).update(data)
  }


  // caso tenha erro
  private handleError(error: any) {
    alert('Erro ao cadastrar')
    console.log(error);
  }

  // criar um novo documento no banco de dados com os dados do usuário
  private SetUserDoc(user: any) {
    // pegar o objeto que é passado pelo firestore
    const userReferencia: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.user.uid}`)
    // pegar os dados
    const data: User = {
      uid: user.user.uid,
      email: user.user.email,
      curriculoAtivo: false,
      cadastroAtivo: true,
      selecionado: false,
      roles: {
        user: true,
        admin: false
      },
      dataCriacao: new Date,
      dataAtualizacao: new Date,
      vagas: {}
    }
    // passar os dados para o objeto
    return userReferencia.set(data, { merge: true })

  }


  // o signOut ou logOut é o mesmo pra ambos
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  // Autorização baseada nos roles ou cargos

  // função para checar quem tem permissão, nesse caso, user e admin
  canUserAdmin(user: User): boolean {
    const allowed = ['admin', 'user', 'superAdmin']
    return this.checkAuthorization(user, allowed)
  }
  // função para checar quem tem permissão, nesse caso, apenas superAdmin
  canAdmin(user: User): boolean {
    const allowed = ['admin', 'superAdmin']
    return this.checkAuthorization(user, allowed)
  }
  // função para checar quem tem permissão, nesse caso, apenas superAdmin
  canSuperAdmin(user: User): boolean {
    const allowed = ['superAdmin']
    return this.checkAuthorization(user, allowed)
  }


  // checa se o usuário possui algum cargo
  private checkAuthorization(user: any, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true
      }
    }
    return false
  }


  // função asincrona de conexao com o google
  async googleLogin() {
    // chama o provedor da google
    const provider = new firebase.auth.GoogleAuthProvider()
    // espera enquanto a autenticação é feita pelo popup
    const credential = await this.afAuth.signInWithPopup(provider)

    this.router.navigate(['/']);

    // retorna as credenciais para que os dados do usuário sejam atualizados
    return this.updateUserData(credential.user)
  }

  private updateUserData(user: any) {
    // seta os dados do usuário no login
    const userReferencia: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`)

    const data: User = {
      uid: user.uid,
      email: user.email,
      curriculoAtivo: false,
      cadastroAtivo: true,
      selecionado: false,
      roles: {
        user: true,
        admin: false
      },
      dataCriacao: new Date,
      dataAtualizacao: new Date,
      vagas: {}
    }
    // this.router.navigate([`edit/${user.uid}`])

    return userReferencia.set(data, { merge: true })
  }






}
