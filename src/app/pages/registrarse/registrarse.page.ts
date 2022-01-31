import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/dominio/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  nombres: string;
  direccion: string;
  telefono: any;
  correo: any;
  contrasenia: any;
  estado: "free";

  usuario: Usuario = new Usuario();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService) { }

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

  guardar() {
    //console.log(this.nombre, this.direccion, this.telefono);
    console.log(this.usuario);

    let params: NavigationExtras = {
      queryParams: {
        nombres: this.nombres,
        direccion: this.direccion,
        telefono: this.telefono,
        correo: this.correo,
        contrasenia: this.contrasenia,
        estado: this.estado,
        contacto: this.usuario,
      },
    };

    this.usuarioService.save(this.usuario);

   // this.router.navigate(['listado-contactos'], params);
  }


}
