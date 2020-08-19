import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarClientesComponent } from './componentes/editar-clientes/editar-clientes.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { AuthGuard } from './guardianes/auth.guard';


const routes: Routes = [
  {path: '',                   component: TableroComponent, canActivate:[AuthGuard]},
  {path: 'login',              component: LoginComponent  },
  {path: 'registrarse',        component: RegistroComponent},
  {path: 'configuracion',      component: ConfiguracionComponent, canActivate:[AuthGuard] },
  {path: 'cliente/editar/:id', component: EditarClientesComponent , canActivate:[AuthGuard] },
  {path: '**',                 component: NoEncontradoComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
