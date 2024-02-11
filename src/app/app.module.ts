import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { BookCatalogComponent } from './components/book-catalog/book-catalog.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { HomeComponent } from './components/home/home.component';
import { QuoteComponent } from './components/quote/quote.component';
import { QuoteCatalogComponent } from './components/quote-catalog/quote-catalog.component';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SiteNavigationComponent } from './components/site-navigation/site-navigation.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookCatalogComponent,
    BookFormComponent,
    HomeComponent,
    QuoteComponent,
    QuoteCatalogComponent,
    QuoteFormComponent,
    RegisterComponent,
    SignInComponent,
    SiteNavigationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
