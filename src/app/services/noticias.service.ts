import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private COUNTRIES = 'https://restcountries.eu/rest/v2/all';

  private NOTICIAS = 'https://newsapi.org/v2/top-headlines?country=mx&apiKey=d316f897018d4e98833cfe3c427740ca';
  private NOTICIASCATEGORIA = 'https://newsapi.org/v2/top-headlines?country=mx&category=';
  private NOTICIASPAIS = 'https://newsapi.org/v2/top-headlines?country=';
  private NOTICIASPAISCATEGORIA = 'https://newsapi.org/v2/top-headlines?';

  constructor(private http: HttpClient) { }

  getPaises(){
    return this.http.get<any>(this.COUNTRIES);
  }

  getNoticias(){
    return this.http.get<any>(this.NOTICIAS);  
  }

  getByCategoria(categoria: string){
    console.log(categoria);
    return this.http.get<any>(this.NOTICIASCATEGORIA+categoria+'&apiKey=d316f897018d4e98833cfe3c427740ca');
  }

  getByPais(pais: string){
    return this.http.get<any>(this.NOTICIASPAIS+pais+'&apiKey=d316f897018d4e98833cfe3c427740ca');
  }

  getByPaisCategoria(pais: string, categoria: string){
    return this.http.get<any>(this.NOTICIASPAISCATEGORIA+'country='+pais+'&category='+categoria+'&apiKey=d316f897018d4e98833cfe3c427740ca');
  }
}
