//CONSTANTES
 const items= document.getElementById('items');//div donde se van a pintar las cajas
 const template_card= document.getElementById('template_card').content;//todo el contendido del div que se va a mostrar en el html
 const fragment= document.createDocumentFragment();//es una memoria volatil que lo ocuparemos 
 let SuperCliente={};


//PRIMERO CARGA LA PAGINA Y LUEGO CAPTURAMOS LOS DATOS DEL ARCHIVO JSON
document.addEventListener('DOMContentLoaded',() =>{//espera que cargue primero el DOM , con el DOMContentLoaded
  fetchData()//una vez que lee el DOM ejecuta la función para capturar los datos del jSon

  //INTENTO RECUPERAR EL LOCALSTORAGE
 /*    if(localStorage.getItem('SuperCliente')){
    SuperCliente=JSON.parse(localStorage.getItem('SuperCliente'))
    Object.values(SuperCliente).forEach((ele)=>{ 
    
      pintarSuperCliente(ele)
    })
   
    console.log(SuperCliente)
  } */

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

//ABRIR CAJA
items.addEventListener('click',e=>{//aqui es donde se detecta el click
  abrirCaja(e);
})

const abrirCaja =e =>{//detecta donde se da el click
  console.log(e.target)//muestra donde se da el click
  console.log(e.target.classList.contains('button'))
  if (e.target.classList.contains('button')){//si da click en el boton ejecuta la accion
    
    if(e.target.textContent=='Caja cerrada'){
      e.target.textContent = "Caja abierta";
      e.target.style.backgroundColor = "#006400";

    }
    setCaja(e.target.parentElement);//envia todos los datos para que se guarden en el objeto
  }
  e.stopPropagation()
}

const setCaja = objeto=>{
  console.log(objeto);
  const cliente ={
    id: objeto.querySelector('.button').dataset.id,
    caja: objeto.querySelector('.contadorCaja').id,
    nombreCaja: objeto.querySelector('.button').textContent,
    cantidad:0,
    estado:"Cliente",
    inicio:0
  }
if(SuperCliente.hasOwnProperty(cliente.id)){
  cliente.cantidad= SuperCliente[cliente.id].cantidad+1;
  cliente.inicio=SuperCliente[cliente.inicio]= new Date()/1000;
   //localStorage.setItem('SuperCliente',JSON.stringify(SuperCliente))

}
SuperCliente[cliente.id]={...cliente};//TODO LO QUE ESTA EN EL OBJETO LO GURADO EN EL ARRAY PARA LUEGO PODER RECORRERLO
  console.log(SuperCliente);
  //console.log(SuperCliente)
  pintarSuperCliente(cliente.id)
}

//let inicio;
const pintarSuperCliente=(e)=>{

  //console.log(SuperCliente)
  Object.values(SuperCliente).forEach((cliente)=>{  
     // console.log(e)
  if(cliente.id==e){

    const nCliente= cliente.cantidad;
    document.getElementById(cliente.id).textContent= cliente.estado+" " +cliente.cantidad;
    e=e-1;
    const botones=document.getElementsByClassName("button button_1")[e];

    if(cliente.cantidad==1){
      botones.textContent='Atendiendo';
      botones.style.backgroundColor='#F39C12'
      inicio= cliente.inicio   
    }  

    if(cliente.cantidad==4){
     let fin= new Date()/1000;  
     alert(fin-inicio);
     alert(cliente.estado+" "+cliente.cantidad+' Caja llena')
     document.getElementById(cliente.id).textContent="";
     cliente.cantidad=-1;
     

   /*   e=e-1;
    const botones=document.getElementsByClassName("button button_1")[e] */
    botones.textContent='Caja cerrada';
    botones.style.backgroundColor='#c0392b';
    return
    }
  }
  })
   localStorage.setItem('SuperCliente',JSON.stringify(SuperCliente))//GUARDO TODOS LOS DATOS EN LOCALSTORAGE
}

//funcion para crear cajas de forma dinámica
const pintarCards=data=>{
  data.forEach(caja => {
    template_card.querySelector('h3').textContent= caja.caja;
    //template_card.querySelector('button').textContent=caja.estado;
    template_card.querySelector('.button').dataset.id=caja.id;//se le asigna un id al boton
    template_card.querySelector('h2').id=caja.id;//se le da un id al h2

    const clone= template_card.cloneNode(true);
    fragment.appendChild(clone);
       //console.log(caja);
  })
  items.appendChild(fragment)
 
 
}