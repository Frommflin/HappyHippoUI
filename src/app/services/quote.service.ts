import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuote, IQuoteId } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "https://happyhippoapi.onrender.com/happyhippoquotes";

  getQuotes(user: string): Observable<IQuoteId[]> {
    return this.http.post<IQuoteId[]>(this.baseUrl + '/getquotes/' + user, user);
  }

  addQuote(quote: IQuote): Observable<IQuoteId> {
    return this.http.post<IQuoteId>(this.baseUrl + '/addquote', quote);
  }

  getQuoteById(id: number): Observable<IQuoteId>{
    return this.http.get<IQuoteId>(this.baseUrl + '/getquote/' + id);
  }

  editQuote(id: number, quote: IQuote): Observable<IQuoteId> {
    let quoteToEdit: IQuoteId = {
      id: id,
      quoteText: quote.quoteText,
      author: quote.author,
      userId: quote.userId
    };

    return this.http.put<IQuoteId>('/edit/' + id, quoteToEdit);
  }

  deleteQuote(id: number): Observable<IQuoteId> {
    return this.http.delete<IQuoteId>(this.baseUrl + '/delete/' + id);
  }
}
