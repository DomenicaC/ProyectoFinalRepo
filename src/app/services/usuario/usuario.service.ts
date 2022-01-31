import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
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

  inicioS(correo: string/*, contrasenia: string*/): Observable<any[]> {
    const refInicio = this.afs.collection('usuario', ref => ref.where('correo', '==', correo)
    );
    return refInicio.valueChanges();
  }


  
}
