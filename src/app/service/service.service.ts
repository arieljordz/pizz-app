import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRespModel, ApiResponseModel, IOrder } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiURL: string = "https://localhost:7166/api";
  
  constructor(private http: HttpClient) { }

  getOrders(page: number = 1, pageSize: number = 10): Observable<ApiRespModel> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiRespModel>(`${this.apiURL}/Order/GetOrders`, { params });
  }

  importFileOrders(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/Order/ImportOrders`, formData);
  }

  
  getOrderDetails(page: number = 1, pageSize: number = 10): Observable<ApiRespModel> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiRespModel>(`${this.apiURL}/OrderDetail/GetOrderDetails`, { params });
  }

  importFileOrderDetails(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/OrderDetail/ImportOrderDetails`, formData);
  }

  getPizzas(page: number = 1, pageSize: number = 10): Observable<ApiRespModel> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiRespModel>(`${this.apiURL}/Pizza/GetPizzas`, { params });
  }

  importFilePizzas(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/Pizza/ImportPizzas`, formData);
  }

  getPizzaTypes(page: number = 1, pageSize: number = 10): Observable<ApiRespModel> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiRespModel>(`${this.apiURL}/PizzaType/GetPizzaTypes`, { params });
  }

  importFilePizzaTypes(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/PizzaType/ImportPizzaTypes`, formData);
  }


}
