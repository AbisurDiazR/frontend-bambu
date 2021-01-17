import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  paises = [];
  pais = {
    nombre : '',
    code : ''
  }

  listaCategorias = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];  
  listaPaises = [];

  parametros = {
    codigoPais : '',
    categoriaNoticia : ''
  }

  noticias = [];

  constructor(private noticiasServices: NoticiasService, public noticiasService: NoticiasService
    , public auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.noticiasService.getPaises().subscribe((res) => {
      this.paises = res;
      for (let i = 0; i < this.paises.length; i++) {
        this.pais.nombre = this.paises[i].name;
        this.pais.code = this.paises[i].alpha2Code;
        this.listaPaises.push({nombre: this.pais.nombre, code: this.pais.code});      
      }
    });

    this.noticiasServices.getNoticias().subscribe(
      res => {
        this.noticias = res.articles;
      }
    );

  }

  logout(){
    this.auth.signOut();
  }

  irNoticias(){
    if(this.parametros.codigoPais.length == 0 && this.parametros.categoriaNoticia.length == 0){
      
      this.noticiasServices.getNoticias().subscribe(
        res => {
          this.noticias = res.articles;
        }
      );
    }else if(this.parametros.codigoPais.length == 0 && this.parametros.categoriaNoticia.length != 0){
      
      this.noticiasService.getByCategoria(`${this.parametros.categoriaNoticia}`).subscribe(
        res => {
          this.noticias = res.articles;
        }
      );
    }else if(this.parametros.codigoPais.length != 0 && this.parametros.categoriaNoticia.length == 0){
      this.noticiasService.getByPais(`${this.parametros.codigoPais}`).subscribe(
        res => {
          this.noticias = res.articles;
        }
      );
    }else if(this.parametros.codigoPais.length != 0 && this.parametros.categoriaNoticia.length != 0){
      this.noticiasService.getByPaisCategoria(`${this.parametros.codigoPais}`,`${this.parametros.categoriaNoticia}`).subscribe(
        res => {
          this.noticias = res.articles;
        }
      );
    }
  }

}
