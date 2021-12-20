//CONSTANTES
 const items= document.getElementById('items');//div donde se van a pintar las cajas
 const template_card= document.getElementById('template_card').content;//todo el contendido del div que se va a mostrar en el html
 const fragment= document.createDocumentFragment();//es una memoria volatil que lo ocuparemos 


//PRIMERO CARGA LA PAGINA Y LUEGO CAPTURAMOS LOS DATOS DEL ARCHIVO JSON
document.addEventListener('DOMContentLoaded',() =>{//espera que cargue primero el DOM , con el DOMContentLoaded
  fetchData()//una vez que lee el DOm ejecuta la función para capturar los datos del jSon
})

const fetchData =async()=>{
  try{//sino encuentra el jSon envia un error
    const res=await fetch('supermercado.json');//await espera que lea primero el jSon 
    const data= await res.json();//guardamos en data los datos del Json y espera hasta el documento este cargado para mostrarlos
    pintarCards(data);//llama a la función para pintar las cajas y se le pasa data que son los elementos que vamos a pintar
  }catch(error){
    console.log(error);
  }
}

//ACCEDER A TEMPLATE
//const hijo= document.getElementById('card_body');
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
const contadorCaja=objeto=>{
   console.log(objeto);
   const cuenta={
     id: objeto.querySelector('.button').dataset.id,
     cantidad:0,
     estado:"cliente",
     inicio: 0,
     fin:0
   }

   if(contador.hasOwnProperty(cuenta.id)){
     cuenta.cantidad=contador[cuenta.id].cantidad+1;
     cuenta.inicio= new Date();
  /* 
     console.log(cuenta.cantidad);  
     console.log(cuenta.inicio) */  
   }

   contador[cuenta.id]={...cuenta}
   //console.log(contador);
   pintarContador(cuenta);

   } 
//pintar cajas
   const pintarContador=(e)=>{
     
     Object.values(contador).forEach(nCaja=>{ 
      const con=document.getElementById(e.id);
      con.textContent=nCaja.estado+' '+e.cantidad 


      if(e.cantidad===4){
        //console.log(e.tiempo/1000)
        nCaja.fin = new Date();
        
       console.log(nCaja.fin);
     
        let tiempoTranscurrido = (nCaja.fin-nCaja.inicio)/1000; //en milisegundos
       //console.log(tiempoTranscurrido);
        alert('tiempo transcurrido:' + tiempoTranscurrido); 
        alert('caja llena');
        nCaja.cantidad=0;
                    
      }
   
     })
 e.stopPropagation();

   }
 contadorCaja(e.target.parentElement)
  }
  e.stopPropagation();//detiene el evento que se haya generado 
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