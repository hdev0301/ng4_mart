/**
 * @author Qamar-ud-Din <m.qamaruddin@mqubits.com>
 */
import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { OAuthService } from './../../services/oauth/oauth.service';
import { User } from './../../models/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import { environment } from './../../../../environments/environment';
import { Handler } from './../handler';

@Injectable()
export class ProfileService {
    private baseUrl;
    private endpoint = 'users/';

    constructor(
        private http: Http,
        private oauthService: OAuthService,
        private handler: Handler
    ) {
        this.baseUrl = environment.apiEndpoint;
    }

    public show(id: Number): Observable<any> {
        return this.oauthService.getAccessToken()
            .flatMap((data) => (this.aux(id, data)))
            .catch(this.handler.render);
    }

    public aux(id: Number, accessToken: String): Observable<any> {
        let objHeaders = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.rest.v1+json',
            'Authorization': `Bearer ${accessToken}`
        });
        let options = new RequestOptions({
            headers: objHeaders
        });
        return this.http
            .get(this.baseUrl + this.endpoint + id, options)
            .map((response: Response) => (response.json().message.user as User));
    }
}
