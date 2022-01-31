import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  nombres: string;
  direccion: string;
  telefono: any;
  correo: any;
  contrasenia: any;
  usuarios: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.correo =
          this.router.getCurrentNavigation().extras.queryParams.correo;
        console.log(this.correo);
      }
    });
  }

  ngOnInit() {
    this.usuarios = this.usuarioService.inicioS(this.correo);

    console.log(this.correo);
  }
}
