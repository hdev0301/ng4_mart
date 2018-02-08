/**
 * @author Hdev <hdev0301@gmail.com>
 */
import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { OAuthService } from './../oauth/oauth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import { environment } from './../../../../environments/environment';
import { Handler } from './../handler';

@Injectable()
export class BrandsService {
    private baseUrl;
    private endpoint = 'brands';

    constructor(
        private http: Http,
        private oauthService: OAuthService,
        private handler: Handler,
    ) {
        this.baseUrl =environment.apiEndpoint;
    }

    public getBrands(): Observable<any> {
        return this.oauthService.getAccessToken()
            .flatMap((data) => (this.aux(data)))
            .catch(this.handler.render);
    }

    public aux(accessToken: String): Observable<any> {
        let objHeaders = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.rest.v1+json',
            'Authorization': `Bearer ${accessToken}`
        });
        let options = new RequestOptions({
            headers: objHeaders
        });
        return this.http
            .get(this.baseUrl + this.endpoint, options)
            .map((response: Response) => (response.json().message));
    }
}