import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggerIn: boolean;
  loggedInUser: string; 

  constructor(
    private loginService: LoginService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggerIn =true;
        this.loggedInUser = auth.email;
      }
      else{
        this.isLoggerIn =false;
      }
    })
  }

  logout(){
    this.loginService.logout();
    this.isLoggerIn = false;
    this.router.navigate(['/login']);

  }

}
