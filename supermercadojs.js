//PRIMERO CARGA LA PAGINA Y LUEGO CAPTURAMOS LOS DATOS DEL ARCHIVO JSON
document.addEventListener('DOMContentLoaded',() =>{
  fetchData()
})

const fetchData =async()=>{
  try{
    const res=await fetch('supermercado.json');
    const data= await res.json();
    pintarCards(data);
  }catch(error){
    console.log(error);
  }
}
//ACCEDER A TEMPLATE

const items= document.getElementById('items');
const template_card= document.getElementById('template_card').content;
const fragment= document.createDocumentFragment();
const nombreBoton= document.getElementsByClassName('button').content;
let contador={};
//funcion abrir caja
items.addEventListener('click',e=>{
  abrirCaja(e);
})
//abrir caja
const abrirCaja=e=>{
  if(e.target.classList.contains('button')){
  //var s=template_card.querySelector('.button').dataset.id=e.target.dataset.id;//obtiene el id de la caja
  e.target.textContent="caja abierta";
  e.target.style.backgroundColor = "green";
  const contenido = document.getElementById('card_body');
  const boton = document.createElement("button");
            boton.type = "button";
            boton.innerText = "Cerrando caja";
            boton.className = "button";
            boton.style.backgroundColor = "#F84300";
           // let x = document.getElementById("caja_1");
       
      //contenido.appendChild(boton);
 // e.target.style.display="none";//oculta el boton
 contadorCaja(e.target.parentElement)
  }
  e.stopPropagation();//detiene el evento que se haya generado con el
}
//contador
 const contadorCaja=objeto=>{
   console.log(objeto);
   const cuenta={
     id: objeto.querySelector('.button').dataset.id,
     cantidad:0,
     estado:"cliente"
   }

   if(contador.hasOwnProperty(cuenta.id)){
     cuenta.cantidad=contador[cuenta.id].cantidad+1;
     console.log(cuenta.cantidad);
    
   }
   contador[cuenta.id]={...cuenta}
   //console.log(contador);
   pintarContador();
   } 
///mirar que no fucniona
   const pintarContador=()=>{

     Object.values(contador).forEach(nCaja=>{
       //template_card.querySelector('.button').textContent="caja";
      // nombreBoton.textContent="caja";
      //console.log(template_card.querySelector('.button'))
      //template_card.querySelector('h2').textContent=nCaja.estado+' '+nCaja.cantidad
      //document.getElementsByTagName('h2').value= nCaja.estado+' '+nCaja.cantidad;
 
      const con=document.getElementById('contador');
      con.textContent=nCaja.estado+' '+nCaja.cantidad 
    //console.log(template_card.querySelector('h2').textContent=nCaja.estado+' '+nCaja.cantidad)
     //console.log(nCaja.estado+' '+nCaja.cantidad);//bueno
      const clone= con.cloneNode(con);
      fragment.appendChild(clone);
     })
 items.appendChild(fragment)
   }
//funcion para crear cajas
const pintarCards=data=>{
  data.forEach(caja => {
    template_card.querySelector('h3').textContent= caja.caja;
    //template_card.querySelector('button').textContent=caja.estado;
    template_card.querySelector('.button').dataset.id=caja.id;
    template_card.querySelector("h2").textContent;
     const clone= template_card.cloneNode(true);
    fragment.appendChild(clone);
       //console.log(caja);
  })
  items.appendChild(fragment)
 
}