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
//const hijo= document.getElementById('card_body');
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


  //const contenido = document.getElementById('card_body');
 // const boton = document.createElement("button");
           // boton.type = "button";
           // boton.innerText = "Cerrando caja";
           // boton.className = "button";
            //boton.style.backgroundColor = "#F84300";
           // let x = document.getElementById("caja_1");
       
      //contenido.appendChild(boton);
 // e.target.style.display="none";//oculta el boton
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
   pintarContador(cuenta);

   } 
///mirar que no fucniona
   const pintarContador=(e)=>{
     
   /*  const boton = document.createElement("button");
    boton.getElementsByClassName('button');
    boton.innerText='cliente' */

     Object.values(contador).forEach(nCaja=>{ 
      const con=document.getElementById(e.id)
      con.textContent=nCaja.estado+' '+e.cantidad 
    if(e.cantidad==1){
         /*   const boton = document.createElement("button");
           boton.type = "button";
           boton.innerText = "atendiendo";
           boton.classList="button";
           boton.style.backgroundColor = "#F84300";
           let x = document.getElementById("card_body");
           x.appendChild(boton); */
           return;
      }

      if(e.cantidad==4){

        alert('caja llena')
        nCaja.cantidad=0;
        
        
      }
    
     })

//detiene el evento que se haya generado con el
   }
 contadorCaja(e.target.parentElement)
  }
  e.stopPropagation();//detiene el evento que se haya generado con el
}

//funcion para crear cajas
const pintarCards=data=>{
  data.forEach(caja => {
    template_card.querySelector('h3').textContent= caja.caja;
    //template_card.querySelector('button').textContent=caja.estado;
    template_card.querySelector('.button').dataset.id=caja.id;
    template_card.querySelector("h2").id=caja.id;
     const clone= template_card.cloneNode(true);
    fragment.appendChild(clone);
       //console.log(caja);
  })
  items.appendChild(fragment)
 
}