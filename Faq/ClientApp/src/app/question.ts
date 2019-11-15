import { EmailValidator } from "@angular/forms";

export class Question {
    constructor(
        public title: string,
        public body: string,
        public category: string,
        public name: string,
        public email: string
        ) { }
}
