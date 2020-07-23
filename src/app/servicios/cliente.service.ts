import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../modelo/cliente.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class ClienteServicio{
    //Variables que se utilizaran en este servicio
    clieentesColeccion : AngularFirestoreCollection<Cliente>;
    clienteDoc : AngularFirestoreDocument<Cliente>;
    clientes : Observable<Cliente[]>;
    cliente : Observable<Cliente>;

    // injectar servicio de angular firestore
    constructor(private db: AngularFirestore){
        this.clieentesColeccion = db.collection('clientes', ref  => ref.orderBy('nombre','asc'))

    }

    getCLientes(): Observable<Cliente[]>{
        //obtener los clientes
        this.clientes = this.clieentesColeccion.snapshotChanges().pipe(
            map( cambios => {
                return cambios.map(accion =>{
                    const datos = accion.payload.doc.data() as Cliente;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.clientes;
    }
}