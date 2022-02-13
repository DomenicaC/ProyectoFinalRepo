import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
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
    private usuarioService: UsuarioService,
    private authService:AuthService
  ) {
    /*this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.correo =
          this.router.getCurrentNavigation().extras.queryParams.correo;
        console.log(this.correo);
      }
    });*/
  }

  ngOnInit() {
    //this.usuarios = this.usuarioService.inicioS(this.correo);
    //console.log(this.correo);
  }

  data = [
    {
      imageUrl:
        'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
      title: 'Heading One',
      description:
        'Some quick example text to build on the card title and make up the bulk of the cards content',
    },
    {
      imageUrl:
        'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
      title: 'Heading Two',
      description:
        'Some quick example text to build on the card title and make up the bulk of the cards content',
    },
    {
      imageUrl:
        'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
      title: 'Heading Three',
      description:
        'Some quick example text to build on the card title and make up the bulk of the cards content',
    },
    {
      imageUrl:
        'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
      title: 'Heading Four',
      description:
        'Some quick example text to build on the card title and make up the bulk of the cards content',
    },
    {
      imageUrl:
        'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
      title: 'Heading Four',
      description:
        'Some quick example text to build on the card title and make up the bulk of the cards content',
    },
  ];

  slideOpts = {
    initialSlide: 0,
    spaceBetween: 0,
    slidesPerView: 'auto',
  };

  seleccion(dato: any) {
    let params: NavigationExtras = {
      queryParams: {
        dato: dato,
      },
    };
    // llamar a la otra pagina
    this.router.navigate(['lugar'], params);
  }

  cerrar(){
    this.authService.logout();
    this.router.navigate(['inicio-sesion']);
  }
}
