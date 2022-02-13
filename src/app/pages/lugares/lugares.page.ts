import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GooglemapsComponent } from 'src/app/component/googleMaps/googlemaps/googlemaps.component';
import { Lugar } from 'src/app/dominio/lugar';
import { LugarService } from 'src/app/services/lugar/lugar.service';
import { MapaService } from 'src/app/services/maps/mapa.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.page.html',
  styleUrls: ['./lugares.page.scss'],
})
export class LugaresPage implements OnInit {
  ubicacion = null;
  dueno: any;
  titulo: any;
  desCorta: any;
  desLarga: any;
  imgUrl: any;

  mapa: Lugar = new Lugar();

  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private lugarService: LugarService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      //console.log(params);
      //this.nombre = params.nombre;

      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.mapa = this.router.getCurrentNavigation().extras.queryParams.mapa;
        console.log(this.mapa);
      }
    });
  }

  async addDirection() {
    this.mapa.ubicacion = null;
    const ubicacion = this.mapa.ubicacion;
    let positionInput = {
      lat: -2.891918747370772,
      lng: -78.9670348606935,
    };
    if (ubicacion !== null) {
      positionInput = ubicacion;
    }

    const modalAdd = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: { posicion: positionInput },
    });

    await modalAdd.present();

    const { data } = await modalAdd.onWillDismiss();
    if (data) {
      console.log('data -> ', data);
      this.mapa.ubicacion = data.pos;
      console.log('this.mapa -> ', this.mapa);
    }
  }

  guardar() {
    //console.log(this.nombre, this.direccion, this.telefono);
    console.log(this.mapa);

    let params: NavigationExtras = {
      queryParams: {
        titulo: this.titulo,
        ubicacion: this.ubicacion,
        dueno: this.dueno,
        desCorta: this.desCorta,
        desLarga: this.desLarga,
        imgUrl: this.imgUrl,
      },
    };

    this.lugarService.save(this.mapa);

    //this.router.navigate(['listado-mapa'], params);
  }

  
}
