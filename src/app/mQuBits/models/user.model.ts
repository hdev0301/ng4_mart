/**
 * @author Hdev <hdev0301@gmail.com>
 */

export class User {
    constructor(
        public id: Number,
        public email: String,
        public createdAt: String,
        public updatedAt: String,
        public mobile: String,
        public firstName: String,
        public lastName: String,
        public address: String,
        public district: String,
        public city: String,
        public state: String,
        public country: String,
        public birthdate: String,
        public profileImage: Number,
        public userID: Number,
        public gender: String,
        public paymobPaymentToken: String,
        public deletedAt: any,
        public postalCode: String,
        public longitude: String,
        public latitude: String,
        public timezone: String,
        public continent: String,
        public currency: String,
        public ip: String,
        public image: String,
        public apartment: String,
        public floor: String,
        public building: String,
        public street: String
    ) { }
}

export const genders = ['Male', 'Female'];
