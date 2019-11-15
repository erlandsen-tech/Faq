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
import { MatExpansionModule, MatSliderModule, MatTabsModule, MatButtonModule, MatButtonToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionSearchComponent } from './question-search/question-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FaqComponent,
        SkjemaComponent,
        QuestionSearchComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        NgbModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSliderModule,
        MatTabsModule,
        MatInputModule,
        MatExpansionModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'faq', component: FaqComponent },
            { path: 'skjema', component: SkjemaComponent },
            { path: 'sok', component: QuestionSearchComponent }
        ])
    ],
    providers: [TilkoblingService, CookieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
