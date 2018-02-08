/**
 * @author Qamar-ud-Din <m.qamaruddin@mqubits.com>
 */
import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { OAuthService } from './../../services/oauth/oauth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import { environment } from './../../../../environments/environment';
import { Handler } from './../handler';

@Injectable()
export class CheckoutService {
    private baseUrl;
    private endpoint = 'orders';

    constructor(
        private http: Http,
        private oauthService: OAuthService,
        private handler: Handler
    ) {
        this.baseUrl = environment.apiEndpoint;
    }

    public checkout(payload: any): Observable<any> {
        return this.oauthService.getAccessToken()
            .flatMap((data) => (this.aux(payload, data)))
            .catch(this.handler.render);
    }

    public aux(payload: any, accessToken: String): Observable<any> {
        let objHeaders = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.rest.v1+json',
            'Authorization': `Bearer ${accessToken}`
        });
        let options = new RequestOptions({
            headers: objHeaders
        });
        let body = JSON.stringify(payload);
        return this.http
            .post(this.baseUrl + this.endpoint, body, options)
            .map((response: Response) => (response.json().message));
    }
}
