import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/dominio/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private afs: AngularFirestore) {}

  save(usuario: Usuario) {
    const refUsuario = this.afs.collection('usuario');

    if (usuario.uid == null) {
      usuario.uid = this.afs.createId();
    }

    refUsuario.doc(usuario.uid).set(Object.assign({}, usuario));
  }
}
