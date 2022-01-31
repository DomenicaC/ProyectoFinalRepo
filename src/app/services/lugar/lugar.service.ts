import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Lugar } from 'src/app/dominio/lugar';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private afs: AngularFirestore) { }

  save(mapa: Lugar) {
    const refMapa = this.afs.collection('mapa');

    if (mapa.id == null) {
      mapa.id = this.afs.createId();
    }

    refMapa.doc(mapa.id).set(Object.assign({}, mapa));
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
}
