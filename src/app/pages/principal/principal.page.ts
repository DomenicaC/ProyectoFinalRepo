import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Lugar } from 'src/app/dominio/lugar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LugarService } from 'src/app/services/lugar/lugar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { LugaresPage } from '../lugares/lugares.page';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  titulo: string;
  desCorta: string;
  desLarga: any;
  dueno: any;
  ubicacion: null;
  imgUrl: any;
  lugares: any;

  lugar: Lugar;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private lugarService: LugarService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.lugar =
          this.router.getCurrentNavigation().extras.queryParams.lugar;
        console.log(this.lugar);
      }
    });
  }

  ngOnInit() {
    //this.usuarios = this.usuarioService.inicioS(this.correo);
    //console.log(this.correo);
    this.lugares = this.lugarService.getMapas();
    console.log(this.lugares);
  }

  slideOpts = {
    initialSlide: 0,
    spaceBetween: 0,
    slidesPerView: 'auto',
  };

  seleccion(lugar: Lugar) {
    //console.log(lugar);
    
    let params: NavigationExtras = {
      queryParams: {
        lugar: lugar,
      },
    };
    // llamar a la otra pagina
    this.router.navigate(['lugar'], params);
  }

  cerrar() {
    this.authService.logout();
    this.router.navigate(['inicio-sesion']);
  }
}
