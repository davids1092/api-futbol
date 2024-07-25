import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private selection = new BehaviorSubject <string>('Equipos')
url = 'https://football-data1.p.rapidapi.com'
 httpOptions ={
    headers: new HttpHeaders({
      'x-rapidapi-key': 'd5b730d756msh7cbd87b0a4c1ef9p1dae89jsn140844fed732',
		  'x-rapidapi-host': 'football-data1.p.rapidapi.com'
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
