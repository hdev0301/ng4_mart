/**
 * @author Hdev <hdev0301@gmail.com>
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
export class CouponsService {
    private baseUrl;
    private endpoint = 'coupons/recent';
    private endpoint_listing = 'coupons';
    constructor(
        private http: Http,
        private oauthService: OAuthService,
        private handler: Handler
    ) {
        this.baseUrl = environment.apiEndpoint;
    }

    public list(): Observable<any> {
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
            .map((response: Response) => (response.json().message.coupon));
    }
    public list_pagination(): Observable<any> {
        return this.oauthService.getAccessToken()
            .flatMap((data) => (this.aux2(data)))
            .catch(this.handler.render);
    }

    public aux2(accessToken: String): Observable<any> {
        let objHeaders = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.rest.v1+json',
            'Authorization': `Bearer ${accessToken}`
        });
        let options = new RequestOptions({
            headers: objHeaders
        });
        return this.http
            .get(this.baseUrl + this.endpoint_listing, options)
            .map((response: Response) => (response.json().message.coupons));
    }
}
