/**
 * @author Qamar-ud-Din <m.qamaruddin@mqubits.com>
 */
import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from './../../../mQuBits/models/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import { environment } from './../../../../environments/environment';
import { Handler } from './../handler';

@Injectable()
export class LoginService {
    private baseUrl;
    private endpoint = 'oauth/access_token';

    constructor(
        private http: Http,
        private handler: Handler
    ) {
        this.baseUrl = environment.apiEndpoint;
    }

    public login(params: any): Observable<any> {
        let objHeaders = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: objHeaders
        });
        let searchParams = new URLSearchParams();
        for (let param in params) {
            if (!param) {
                continue;
            }
            searchParams.set(param, params[param]);
        }
        return this.http.post(this.baseUrl + this.endpoint, searchParams.toString(), options)
            .map(
            (response: Response) => {
                localStorage.setItem('token', response.json().message.oauth.access_token);
                localStorage.setItem('token_type', response.json().message.oauth.token_type);
                localStorage.setItem('token_ttl', response.json().message.oauth.expires_in);
                localStorage.setItem('refresh_token', response.json().message.oauth.refresh_token);
                let timeStamp = Math.round(new Date().getTime() / 1000);
                localStorage.setItem('token_timestamp', (String)(timeStamp));
                return response.json().message.user as User;
            }
            )
            .catch(this.handler.render);

    }

    public isLoggedIn() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

    }

    public logOut() {
        localStorage.removeItem('currentUser');

    }
}
