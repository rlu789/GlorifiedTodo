import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CardCollection } from './card-collections.service';
import { ServiceBaseService } from './service-base.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private headers: HttpHeaders;
  private accessPointUrl: string = this.serviceBase.accessPointUrlBase + 'boards';

  constructor(private http: HttpClient, public serviceBase: ServiceBaseService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  public get() {
    return this.serviceBase.call(this.serviceBase.Constants.Get, this.accessPointUrl, this.headers);
  }

  public getSingle(id: number) {
    return this.serviceBase.call(this.serviceBase.Constants.Get, this.accessPointUrl + '/' + id, this.headers);
  }

  public add(payload: Board) {
    return this.serviceBase.call(this.serviceBase.Constants.Post, this.accessPointUrl, this.headers, payload);
  }

  public remove(payload: Board, password: string) {
    return this.serviceBase.call(this.serviceBase.Constants.Delete, this.accessPointUrl + '/' + payload.id, this.serviceBase.generateHeaders(password), payload);
  }

  public update(payload: Board, password: string) {
    return this.serviceBase.call(this.serviceBase.Constants.Put, this.accessPointUrl + '/' + payload.id,
      this.serviceBase.generateHeaders(password), payload);
  }

  public authorize(id: number, password: string) {
    return this.serviceBase.call(this.serviceBase.Constants.Post, 
      this.accessPointUrl + '/' + id + '/authorize', this.serviceBase.generateHeaders(password));
  }
}

export class Board {
  public id: number;
  public cardCollection: Array<CardCollection>;
  public password: string;
  constructor(public title?: string) { }

  public clone(b: Board){
    this.id = b.id;
    // this.cardCollection = b.cardCollection; currently not used by board api post methods
    this.title = b.title;
    this.password = undefined;
  }
}