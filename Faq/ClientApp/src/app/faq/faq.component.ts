import { Component, OnInit } from '@angular/core';
import { TilkoblingService } from '../tilkobling.service';
import { Dbq } from '../dbq';
import { FormControl } from '@angular/forms';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
    dbq: Dbq[];

    constructor(private tilkobling: TilkoblingService, private cookieService: CookieService) { }
    tabs = ['Tilbakemeldinger', 'Spørsmål'];
    selected = new FormControl(0);
    faThumbsUp = faThumbsUp;
    faThumbsDown = faThumbsDown;

    testArray = [1, 2, 3];
    voteState = new Map<number, number>();

    ngOnInit() {
        this.getQ();
        this.createCookie();
        this.getState();
    }
    getQ(): void {
        this.tilkobling.getQ()
            .subscribe(questions => {
                this.dbq = questions;
            })
    }
    vote(id: number, vote: number): void {
        this.tilkobling.Vote(id, vote)
            .subscribe();
    }

    //upDoot / downDoot
    doot(item: any, vote: number): number {
        var returnValue = 0;
        if (this.getUpState(item) || this.getDownState(item)) {
            switch (this.getUpState(item)) {
                case (true): this.vote(item.id, -1); returnValue = -1; break;
                case (false): this.vote(item.id, 1); returnValue = 1; break;
            }
            this.setState(item.id, 0);
            return returnValue;
        }
        else {
            switch (vote) {
                case (1): this.vote(item.id, vote); this.setState(item.id, 1); returnValue = 1; break;
                case (-1): this.vote(item.id, vote); this.setState(item.id, -1); returnValue = -1;break;
            }
            return returnValue;

        }
    }
    updateCookie(cookieMap: Map<any, any>) {
        var expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + 7);
        this.cookieService.set('votes', this.mapToJson(cookieMap), expiredDate);
        this.getState();
    }

    getUpState(item: any): boolean {
        return (this.voteState.get(item.id) == 1);
    }
    getDownState(item: any): boolean {
        return (this.voteState.get(item.id) == -1);
    }

    setState(id: number, state: number) {
        var cookie = this.getCookie();
        var cookieMap = this.jsonToMap(cookie);
        cookieMap.set(id, state);
        this.updateCookie(cookieMap);
    }

    createCookie() {
        if (!this.cookieService.check('votes')) {
            var expiredDate = new Date();
            expiredDate.setDate(expiredDate.getDate() + 7);
            this.cookieService.set('votes', this.mapToJson(this.voteState), expiredDate);
        }
    }

    getCookie(): string {
        var cookie = this.cookieService.get('votes');
        return cookie;
    }
    getMap(): Map<any, any> {
        var cookie = this.getCookie();
        var cookieMap = this.jsonToMap(cookie);
        return cookieMap;
    }

    checkCookie(id: number): boolean {
        var cookie = this.getCookie();
        var cookieMap = this.jsonToMap(cookie);
        return cookieMap.has(id);
    }

    deleteCookie(votes: string) {
        this.cookieService.deleteAll();
    }


    getState() {
        if (this.cookieService.check('votes')) {
            this.voteState = this.getMap();
        }
    }

    mapToJson(map) {
        return JSON.stringify([...map]);
    }

    jsonToMap(jsonStr) {
        return new Map(JSON.parse(jsonStr));
    }
}
