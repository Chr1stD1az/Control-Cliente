import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {

  cliente : Cliente ={
    nombre:'',
    apellido :'',
    email: '',
    saldo : 0
  }

  id:string;
  constructor(private clientesServicio:ClienteServicio,
              private flashMessages :FlashMessagesService,
              private router : Router,
              private route : ActivatedRoute) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe(cliente =>{
      this.cliente = cliente;
    });
  }

  guardar({value, valid} : {value:Cliente, valid:boolean}){
    if(!valid){
       this.flashMessages.show('Por favor llena el formulario correctamente',{
         cssClass: 'alert-danger', timeout:3000
       });
    }
    else{
      value.id = this.id;

      //modificar cliente
      this.clientesServicio.modificarCliente(value);
      this.router.navigate(['/']);

    }
  }

  eliminar(){
    if(confirm('¿Seguro que desea eliminar el cliente?')){
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
