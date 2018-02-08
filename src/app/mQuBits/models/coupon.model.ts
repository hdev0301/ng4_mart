/**
 * @author Hdev <hdev0301@gmail.com>
 */

export class Coupon {
    constructor(

        public id: Number,
        public code: String,
        public type: String,
        public value: Number,
        public redeemDatetime: Number,
        public deletedAt: any,
        public createdAt: any,
        public updatedAt: any
    ) { }

    public timer() {
        /**
         * @ TODO live timer using 
         *  benchmark
         * https://angular.io/api/common/AsyncPipe
         */
        if (!this.redeemDatetime) {
            return null;
        }
        let countDownDate: Number;
        let currentTimestamp = Math.round(new Date().getTime() / 1000);
        let timeDiff = +this.redeemDatetime - +currentTimestamp;
        let days = Math.floor(timeDiff / (60 * 60 * 24));
        let hours = Math.floor((timeDiff % (60 * 60 * 24)) / (60 * 60));
        let minutes = Math.floor((timeDiff % (60 * 60)) / (60));
        let seconds = Math.floor((timeDiff % (60)));
        return days + ' : ' + hours + ' : ' + minutes;
    }

}
