import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HttpErrorResponse } from "@angular/common/http/src/response";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductService {

    private _productUrl = 'http://localhost:4200/api/products/products.json';
    //private _productUrl = './api/products/products.json';

    constructor (private _http: HttpClient) {}

    getProducts(): Observable<IProduct[]>
    {
        return this._http.get<IProduct[]>(this._productUrl)
                .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse)
    {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}