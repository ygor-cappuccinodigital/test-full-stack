import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    readonly API = environment.api;

    constructor(
        private http: HttpClient,
    ) {
    }

    postProduct(params): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        return this.http.post(`${this.API}/posts`, params, {headers: headers});
    }

    show(id): Observable<any> {
        return this.http.get(`${this.API}/posts/${id}`);
    }

    destroy(id): Observable<any> {
        return this.http.delete(`${this.API}/posts/${id}`);
    }

    getPosts(): Observable<any> {
        return this.http.get(`${this.API}/posts`);
    }
}
