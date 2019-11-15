import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { tap } from "rxjs/operators";
import { Question } from './question';
import { Dbq } from './dbq';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class TilkoblingService {

    constructor(private http: HttpClient, private messageService: MessageService) { }

    private baseUrl = window.location.origin + '/api/';
    private postUrl = 'saveQ';
    private getUrl = 'gQ';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };

    save(question): Observable<Question> {
        return this.http.post<Question>(this.baseUrl + this.postUrl, JSON.stringify(question), this.httpOptions)
            .pipe(
                tap((newQ: Question) => this.log(`added q with title=${newQ.title}`)),
                catchError(this.errorHandler<Question>('save'))
            );
    }

    getQ(): Observable<Dbq[]> {
        return this.http.get<Dbq[]>(this.baseUrl + this.getUrl)
            .pipe(
                tap(_ => this.log('Fetched questions')),
                catchError(this.errorHandler<Dbq[]>('getQ', []))
            );
    }
    private errorHandler<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);

            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }
    private log(message: string) {
        this.messageService.add(`Tilkoblingsservice: ${message}`);
    }
    searchQuestions(term: string): Observable<Dbq[]> {
        if (!term.trim()) {
            //Returner tom array om ikke funnet.
            return of([]);
        }
        return this.http.get<Dbq[]>(`${this.baseUrl}getByTerm?term=${term}`).pipe(
            tap(_ => this.log(`found questions matching "${term}"`)),
            catchError(this.errorHandler<Dbq[]>('searchQuestions', []))
        );
    }

    getQuestion(id: number): Observable<Dbq> {
        const url = `${this.baseUrl}getById?id=${id}`;
        return this.http.get<Dbq>(url).pipe(
            tap(_ => this.log(`Got question with id=${id}`))
        );
    }
    Vote(id: number, vote: number): Observable<any> {
        const url = `${this.baseUrl}Vote`;
        return this.http.post(url, JSON.stringify({ id: id, vote: vote }), this.httpOptions).pipe(
            catchError(this.errorHandler('Vote', vote)));
    }
}
