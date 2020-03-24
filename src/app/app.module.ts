import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './common/auth/login/login.component';
import { TokenInterceptor } from './common/auth/token.interceptor';
import { HomeComponent } from './home.component';
import { TavernsModule } from './Taverns/taverns.module';
import { TavernInfoComponent } from './Taverns/tavern-info.component';
import { GuestsComponent } from './guests/guests.component';
import { TavernHeaderComponent } from './Taverns/tavern-header.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, LoginComponent, HomeComponent, TavernInfoComponent, GuestsComponent, TavernHeaderComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        TavernsModule,
        AppRoutingModule,
        CookieModule.forRoot(),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
})
export class AppModule {}
