import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Comentario } from 'src/app/dominio/comentarios';
import { Lugar } from 'src/app/dominio/lugar';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private afs: AngularFirestore) { }

  save(mapa: Lugar) {
    const refMapa = this.afs.collection('mapa');

    if (mapa.uid == null) {
      mapa.uid = this.afs.createId();
    }

    refMapa.doc(mapa.uid).set(Object.assign({}, mapa));
  }

  getMapas(): Observable<any[]> {
    const refMapa = this.afs.collection('mapa');
    return refMapa.valueChanges();
  }

  getMapaActivos(): Observable<any[]> {
    const refMapa = this.afs.collection('mapa', (ref) =>
      ref.where("activo", "==", true)
    );
    return refMapa.valueChanges();
  }

  getComentarios(uid:string): Observable<any[]> {

    const refcomentario= this.afs.collection('comentarios',(ref)=>
    ref.where("uidLugar","==",uid));
    return refcomentario.valueChanges();
  }

  saveComentario(comentario: Comentario) {
    const refMapa = this.afs.collection('comentarios');

    if (comentario.uid == null) {
      comentario.uid = this.afs.createId();
    }

    refMapa.doc(comentario.uid).set(Object.assign({}, comentario));
  }

}
