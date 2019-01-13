import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from './cards.service';
import { ServiceBaseService } from './service-base.service';

@Injectable({
  providedIn: 'root'
})
export class CardCollectionsService {
  private headers: HttpHeaders;
  private accessPointUrl: string = this.serviceBaseService.accessPointUrlBase + 'cardCollections';

  constructor(private http: HttpClient, public serviceBaseService: ServiceBaseService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  // public get() {
  //   return this.http.get(this.accessPointUrl, {headers: this.headers});
  // }

  public add(payload: CardCollection, password: string) {
    return this.serviceBaseService.serviceCallBase(this.serviceBaseService.Constants.Post, this.accessPointUrl,
      this.serviceBaseService.generateHeaders(password), payload);
  }

  public remove(payload: CardCollection, password: string) {
    return this.serviceBaseService.serviceCallBase(this.serviceBaseService.Constants.Delete, this.accessPointUrl + '/' + payload.id,
      this.serviceBaseService.generateHeaders(password));
  }

  // public update(payload: CardCollection) {
  //   return this.http.put(this.accessPointUrl + '/' + payload.id, payload, {headers: this.headers});
  // }
}

export class CardCollection {
  public id: number;
  constructor(public title: string, public boardId: number, public card: Array<Card>) { }
}