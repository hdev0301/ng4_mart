/**
 * @author Hdev <hdev0301@gmail.com>
 */
export class Product {

    constructor(
        public title: String,
        public category: String,
        public url: String,
        public images: any,
        public offer_price: any,
        public upc: String,
        public color: any,
        public features: any,
        public width: any,
        public height: any,
        public length: any,
        public price: Number,
        public currency: String,
        public quantity: Number
    ) { }
}
