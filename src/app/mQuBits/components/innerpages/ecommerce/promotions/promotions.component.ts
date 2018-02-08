/**
 * @author Hdev <hdev0301@gmail.com>
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionsService } from './../../../../services/products/promotions.service';

/**
 *  jQuery variables
 */
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'promotions',
    styleUrls: ['./promotions.component.css'],
    templateUrl: './promotions.component.html',
    providers: [PromotionsService]
})

export class PromotionsComponent {

    public items: any;
    public errors: any;
    public config: any;
    public page: number;
    public label: string;

    constructor(
        public route: ActivatedRoute,
        public promotionsService: PromotionsService,
    ) {
        this.page = 1;
    }

    public ngOnInit() {

        $('.brands-menu li').click(function () {
            $(this).toggleClass(' brand-element');
        });

        $('.sort  .brands-menu li.filter').click(2000, function () {
            $(".left-side").css('display', 'block');
            $(".right").css('display', 'none');
        });

        $('.hide-filter').click(function () {
            $(".left-side ").css('display', 'none');
            $(".right ").css('display', 'block');
        });

        $(".reset span").click(function () {
            $('.brands-menu li').removeClass(' brand-element');
        });

        this.route.params.subscribe((params) => {
            this.label = params['label'];
            this.promotionsService.search({
                label: params['label'],
                page: this.page
            }).subscribe(
                (data) => {
                    this.items = [];
                    Object.keys(data).map((key) => {
                        this.items.push(data[key]);
                    });
                },
                (errors) => {
                    this.errors = errors;
                }
                );
        });
    }


    public onScroll(event) {
        this.page += 1;
        this.promotionsService.search({
            label: this.label,
            page: this.page
        }).subscribe(
            (data) => {
                Object.keys(data).map((key) => {
                    this.items.push(data[key]);
                });
            },
            (errors) => {
                this.errors = errors;
            }
            );
    }
}
