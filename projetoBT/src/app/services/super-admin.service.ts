import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  constructor(private firestoreAngular: AngularFirestore) { }

  //listar os usuários
  listUsers(): Observable<any> {
    return this.firestoreAngular
      .collection('users', (user) => user.where('roles.user', '==', true).where('roles.admin', '==', false)).snapshotChanges();
  }

  //listar os admins
  listAdmins(): Observable<any> {
    return this.firestoreAngular
      .collection('users', (user) => user.where('roles.admin', '==', true)).snapshotChanges();
  }

  concederAdmin(id: string): Promise<any> {
    return this.firestoreAngular.collection('users').doc(id).update({ roles: { user: true, admin: true }, curriculoAtivo: false });
  }
  retirarAdmin(id: string): Promise<any> {
    return this.firestoreAngular.collection('users').doc(id).update({ roles: { user: true, admin: false } });
  }
}
