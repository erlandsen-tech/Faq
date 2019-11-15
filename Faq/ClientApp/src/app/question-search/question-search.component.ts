import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Dbq } from '../dbq';
import { TilkoblingService } from '../tilkobling.service';

@Component({
    selector: 'app-question-search',
    templateUrl: './question-search.component.html',
    styleUrls: ['./question-search.component.css']
})
export class QuestionSearchComponent implements OnInit {

    questions$: Observable<Dbq[]>;
    private searchTerms = new Subject<string>();

    constructor(private tilkoblingservice: TilkoblingService) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.questions$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.tilkoblingservice.searchQuestions(term)),
        );
    }

}
