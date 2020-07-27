import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import {Cliente} from 'src/app/modelo/cliente.model'
import { FlashMessage } from 'angular2-flash-messages/module/flash-message';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente : Cliente ={
    nombre :'',
    apellido : '',
    email:'',
    saldo:0
  }

  @ViewChild("clienteForm") clienteForm:NgForm;
  @ViewChild("botonCerrar") botonCerrar:ElementRef;

  constructor( private clientesServicio:ClienteServicio,
               private flashMessages :FlashMessagesService) { }

  ngOnInit(): void {
    this.clientesServicio.getCLientes().subscribe(
      clientes =>{
        this.clientes = clientes;
      }
    )
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes){
      this.clientes.forEach( cliente => {
        saldoTotal += cliente.saldo;
      })

    }
    return saldoTotal;
  }

  agregarCli({value, valid} : {value:Cliente, valid:boolean}){
    if(!valid){
       this.flashMessages.show('Por favor llena el formulario correctamente',{
         cssClass: 'alert-danger', timeout:3000
       });
    }
    else{
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();

    }
  }

  cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
