export class Lugar {
  uid: string;
  titulo: string;
  desCorta: string;
  desLarga: string;
  dueno: string;
  ubicacion: {
    lat: number;
    lng: number;
  };
  imgUrl: string;
}
