class Pelicula {
  constructor(nombre,id){
this.nombre= nombre;
this.id=id;

  }
  reproducir(){
  return 'reproduciendo pelicila'+this.nombre;
}

}
class Series extends Pelicula{

constructor(nombre,id,capitulos){
  super(nombre,id);
  this.capitulos= capitulos;
}
  reproducirCapitulo(){
    return 'reproduciendo capiltulo....'+this.capitulos;
  }


}

const pelicula1= new Pelicula('xx',1);
console.log(pelicula1);
console.log(pelicula1.reproducir());

const pelicula2= new Pelicula('yy',2);
console.log(pelicula2);
console.log(pelicula2.reproducir());

const serie1= new Series('hhh',3,55);
console.log(serie1);
console.log(serie1.reproducirCapitulo());