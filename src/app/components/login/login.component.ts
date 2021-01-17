import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  constructor(private login: AutenticacionService) {
  }

  ngOnInit(): void {
  }

  ingresar(proveedor: string){
    console.log(proveedor);
    this.login.login(proveedor);
  }

}
