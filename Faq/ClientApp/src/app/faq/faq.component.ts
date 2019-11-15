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
        this.voteState.set(1, 1);
        this.voteState.set(2, 1);
        this.voteState.set(3, -1);
        this.setState();
    }
    getQ(): void {
        this.tilkobling.getQ()
            .subscribe(questions => this.dbq = questions);
    }
    vote(id: number, vote: number): void {
        this.tilkobling.Vote(id, vote)
            .subscribe();
    }

    //upDoot / downDoot
    doot(item: any, vote: number): void {
        if (item.upactive || item.downactive) {
            switch (item.upactive) {
                case (true): this.vote(item.id, -1); break;
                case (false): this.vote(item.id, 1); break;
            }
            item.downactive = false;
            item.upactive = false;
        }
        else {
            switch (vote) {
                case (1): this.vote(item.id, vote); item.upactive = !item.upactive; break;
                case (-1): this.vote(item.id, vote); item.downactive = !item.downactive; break;
            }

        }
    }

    createCookie() {
        var expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + 7);
        this.cookieService.set('votes', JSON.stringify([...this.voteState]), expiredDate);
        console.log("made");
    }

    getCookie(): string {
        var cookie = this.cookieService.get('votes');
        console.log(cookie);
        return cookie;
    }

    checkCookie(id: number): boolean {
        var cookie = this.getCookie();
        var cookieMap = this.jsonToMap(cookie);
        console.log(cookieMap);
        console.log(cookieMap.has(id));
        return cookieMap.has(id);
    }

    deleteCookie(votes: string) {
        this.cookieService.delete(votes);
    }

    updateCookie(id: number, value: number) {

    }
    setState() {
        var cookie = this.getCookie();
        var cookieMap = this.jsonToMap(cookie);
        console.log(cookieMap.keys());
    }

    mapToJson(map) {
        return JSON.stringify([...map]);
    }

    jsonToMap(jsonStr) {
        return new Map(JSON.parse(jsonStr));
    }
}
