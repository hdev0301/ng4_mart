/**
 * @author Qamar-ud-Din <m.qamaruddin@mqubits.com>
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import { Subject } from 'rxjs/Subject';
import { environment } from './../../../../environments/environment';

@Injectable()
export class CartService {

    // Observable string sources
    public addItemSource = new Subject<string>();

    // Observable string streams
    public itemAddAnnounced$ = this.addItemSource.asObservable();

    constructor(
    ) {
        //
    }

    public insert(item: any) {
        let storedCart: string = localStorage.getItem('cart');
        let items = [];

        if (storedCart) {
            items = JSON.parse(localStorage.getItem('cart'));
        }

        if (!this.isInCart(item)) {
            items.push(item);
            localStorage.setItem('cart', JSON.stringify(items));
        }
    }

    public isInCart(item: any): Boolean {
        let storedCart: string = localStorage.getItem('cart');
        let items = [];
        if (storedCart) {
            items = JSON.parse(localStorage.getItem('cart'));
        }

        for (let storedItem of items) {
            console.log(storedCart);
            if (storedItem.url === item.url) {
                return true;
            }
        }
        return false;
    }

    public remove(item: any) {
        let storedCart: string = localStorage.getItem('cart');
        let items = [];
        if (storedCart) {
            items = JSON.parse(localStorage.getItem('cart'));
        }

        let index = 0;
        for (let storedItem of items) {
            if (storedItem.url === item.url) {
                items.splice(index, 1);
                //console.log(index, items);
                localStorage.setItem('cart', JSON.stringify(items));
                return;
            }
            ++index;
        }
    }

    public get() {
        let storedCart: string = localStorage.getItem('cart');
        let items = [];
        if (storedCart) {
            items = JSON.parse(localStorage.getItem('cart'));
        }
        return items;
    }

    public update(url, data) {
        //
    }

    // Service message commands
    public announceItemAdded(item: any) {
        this.insert(item);
        this.addItemSource.next(item);
        console.log(this.itemAddAnnounced$);
    }

    public sumTotal(): number {
        let ret = 0;
        let storedCart: string = localStorage.getItem('cart');
        let items = [];

        if (storedCart) {
            items = JSON.parse(localStorage.getItem('cart'));
        }

        for (let item of items) {
            if (item.price) {
                ret += parseFloat(item.price);
            } else {
                this.remove(item);
            }
        }
        return Math.round(ret * 100) / 100;
    }

    public cartTotalItem(): number { 
        let ret = 0;
        let storedCart: string = localStorage.getItem('cart');
        let items = [];

        if (storedCart) {
            items = JSON.parse(localStorage.getItem('cart'));
        }

        return items.length;
    } 
}
