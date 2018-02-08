/**
 * @author Hdev <hdev0301@gmail.com>
 */
import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import{Handler} from './../handler';
import { environment } from './../../../../environments/environment';

@Injectable()
export class OAuthService {
    private baseUrl;
    private endpoint = 'oauth/access_token';

    constructor(
        private http: Http,
        private handler: Handler
    ) {
        this.baseUrl = environment.apiEndpoint;
    }

    public authenticate(): Observable<any> {
        let objHeaders = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: objHeaders
        });
        let body = new URLSearchParams();
        body.append('grant_type', 'client_credentials');
        body.append('client_id', environment.clientID);
        body.append('client_secret', environment.clientSecret);
        return this.http.post(this.baseUrl + this.endpoint, body.toString(), options)
            .map(
            (response: Response) => {
                localStorage.setItem('token', response.json().message.oauth.access_token);
                localStorage.setItem('token_ttl', response.json().message.oauth.expires_in);
                localStorage.setItem('token_timestamp', (String)(Math.round(new Date().getTime() / 1000)));
            }
            );
    }

    public getAccessToken(): Observable<any> {
        let tokenTTL = parseInt(localStorage.getItem('token_ttl'), 10) / 1000;
        let tokenTimestamp = parseInt(localStorage.getItem('token_timestamp'), 10);
        let currentTimestamp = Math.round(new Date().getTime() / 1000);
        if ( Math.abs(currentTimestamp - tokenTimestamp) > tokenTTL) {
            localStorage.removeItem('token');
        }
        let token = localStorage.getItem('token');
        if (!token || token === 'undefined' || token === undefined) {
            return this.authenticate().map((dummy) => (localStorage.getItem('token')));
        } else {
            return Observable.of(token);
        }
    }
}
