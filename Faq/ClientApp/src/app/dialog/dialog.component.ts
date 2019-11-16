import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SkjemaComponent } from '../skjema/skjema.component';
import { Question } from '../question';
import { RouterModule, Router } from '@angular/router';
import { TilkoblingService } from '../tilkobling.service';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
    skjema: SkjemaComponent;
    tittel: string;
    body: string;
    category: string;
    name: string;
    email: string;
    form: FormGroup;
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogComponent>,
        private tilkobling: TilkoblingService,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) data) {
        this.tittel = data.title;
        this.body = data.body;
        this.category = data.category;
        this.name = data.name;
        this.email = data.email;
    }

    q: Question[] = [];

    ngOnInit() {
        this.form = this.fb.group({
            title: [this.tittel, []],
            body: [this.body, []],
            category: [this.category, []],
            name: [this.name, []],
            email: [this.email, []]
        });
    }
    save() {
        const skjemaQuestion: Question = Object.assign({},
            this.form.value);
        this.saveQ(skjemaQuestion);
        this.router.navigate(['/takk']);
        this.dialogRef.close();

    }

    close() {
        this.dialogRef.close();
    }

    saveQ(question: Question): void {
        if (!question) { return; }
        this.tilkobling.save(question)
            .subscribe(resp => {
                return this.q.push(resp);
            });
    }

}
