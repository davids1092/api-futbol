import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private selection = new BehaviorSubject <string>('Equipos')
url = environment.urlServices
 httpOptions ={
    headers: new HttpHeaders({
      'x-rapidapi-key': environment.apiKey,
		  'x-rapidapi-host': environment.host
    })

}
  constructor(
    private http : HttpClient
  ) { }

  // metodos para saber la seleccion del usuario para consultar
  setSelection(sel:string){
    this.selection.next(sel);
  }
  getSelection() :Observable<string>{
    //console.log('seleccion en header', this.selection)
    return this.selection.asObservable()
;  }

    // metodos del api
    // consultar equipos API
    findTeams(): Observable<any> {
      const url = `${this.url}/tournament/teams`;
      return this.http.get(url, this.httpOptions);
    }
    findTournaments(): Observable<any> {
      const url = `${this.url}/tournament/list`;
      return this.http.get(url, this.httpOptions);
    }
}
