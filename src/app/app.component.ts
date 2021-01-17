import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAdjust, faUser } from '@fortawesome/free-solid-svg-icons';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiasService } from './services/noticias.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-bambu';

  @ViewChild(NoticiasComponent) noticias;

  public usuario: any = {};  
   
  constructor(public library: FaIconLibrary, public auth: AngularFireAuth, public router: Router){
    library.addIcons(faUser, faAdjust);
    this.auth.authState.subscribe( user => {

      if (!user) {
        this.router.navigate(['/login']);
      }else{
        this.router.navigate(['/noticias']);
      }

      //localStorage.setItem('token',user.uid);
      this.usuario = user;
    });
  }

  ngOnInit(): void{       
  }
  
}
