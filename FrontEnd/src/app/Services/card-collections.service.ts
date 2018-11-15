import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from './cards.service';

@Injectable({
  providedIn: 'root'
})
export class CardCollectionsService {
  private headers: HttpHeaders;
  private accessPointUrl: string = 'http://localhost:57115/api/cardCollections';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public get() {
    return this.http.get(this.accessPointUrl, {headers: this.headers});
  }

  public add(payload: CardCollection) {
    return this.http.post(this.accessPointUrl, payload, {headers: this.headers});
  }

  public remove(payload: CardCollection) {
    return this.http.delete(this.accessPointUrl + '/' + payload.id, {headers: this.headers});
  }

  public update(payload: CardCollection) {
    return this.http.put(this.accessPointUrl + '/' + payload.id, payload, {headers: this.headers});
  }
}

export class CardCollection{
  public id: number;
  constructor (public title: string, public boardId: number, public cards: Array<Card>){}
}