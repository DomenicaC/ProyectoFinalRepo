import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/dominio/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  nombres: string;
  direccion: string;
  telefono: any;
  correo: any;
  contrasenia: any;

  usuario: Usuario = new Usuario();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      //console.log(params);
      //this.nombre = params.nombre;

      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.usuario =
          this.router.getCurrentNavigation().extras.queryParams.usuario;
        console.log(this.usuario);
      }
    });
  }

  ingresar() {
    let params: NavigationExtras = {
      queryParams: {
        correo: this.correo,
      },
    };

    console.log(this.correo);
    console.log('Has ingresado');
    this.router.navigate(['principal'], params);
  }
}
