/**
 * @author Qamar-ud-Din <m.qamaruddin@mqubits.com>
 */
import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { OAuthService } from './../../../mQuBits/services/oauth/oauth.service';
import { User } from './../../models/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import { environment } from './../../../../environments/environment';
import { Handler } from './../handler';

@Injectable()
export class RegisterService {
    private baseUrl;
    private endpoint = 'users/register';

    constructor(
        private http: Http,
        private oauthService: OAuthService,
        private handler: Handler
    ) {
        this.baseUrl = environment.apiEndpoint;
    }

    public register(user: User): Observable<User> {
        return this.oauthService.getAccessToken()
            .flatMap((data) => (this.aux(user, data)))
            .catch(this.handler.render);
    }

    public aux(user: User, accessToken: String): Observable<User> {
        let objHeaders = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.rest.v1+json',
            'Authorization': `Bearer ${accessToken}`
        });
        let options = new RequestOptions({
            headers: objHeaders
        });
        let arrBody = JSON.parse(JSON.stringify(user));
        arrBody['first_name'] = arrBody['firstName'];
        arrBody['last_name'] = arrBody['lastName'];
        arrBody['postal_code'] = arrBody['postalCode'];
        let body = JSON.stringify(arrBody);
        return this.http
            .post(this.baseUrl + this.endpoint, body, options)
            .map((response: Response) => (response.json().message.user as User));
    }
}
