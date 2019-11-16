import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { SkjemaComponent } from './skjema/skjema.component';
import { TilkoblingService } from './tilkobling.service';
import { MatDialogModule , MatIconModule, MatDividerModule, MatExpansionModule, MatSliderModule, MatTabsModule, MatButtonModule, MatButtonToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionSearchComponent } from './question-search/question-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';
import { DialogComponent } from './dialog/dialog.component';
import { TakksideComponent } from './takkside/takkside.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FaqComponent,
        SkjemaComponent,
        QuestionSearchComponent,
        DialogComponent,
        TakksideComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        NgbModule,
        MatButtonModule,
        MatDividerModule,
        MatButtonToggleModule,
        MatSliderModule,
        MatIconModule,
        MatTabsModule,
        MatInputModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatDialogModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'faq', component: FaqComponent },
            { path: 'skjema', component: SkjemaComponent },
            { path: 'sok', component: QuestionSearchComponent },
            { path: 'takk', component: TakksideComponent }
        ])
    ],
    entryComponents: [DialogComponent],
    providers: [TilkoblingService, CookieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
