import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook, IBookId } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "https://happyhippoapi.onrender.com/happyhippobooks";

  getBooks(user: string): Observable<IBookId[]> {

    return this.http.post<IBookId[]>(this.baseUrl + '/getbooks/' + user, user);
  }

  getBookById(id: number): Observable<IBookId>{
    return this.http.get<IBookId>(this.baseUrl + '/getbook/' + id);
  }

  addBook(book: IBook): Observable<IBookId> {
    return this.http.post<IBookId>(this.baseUrl + '/addbook', book);
  }

  editBook(id: number, book: IBook): Observable<IBookId> {
    let bookToEdit: IBookId = {
      id: id,
      title: book.title,
      author: book.author,
      year: book.year,
      userId: book.userId
    };

    return this.http.put<IBookId>(this.baseUrl + '/edit/' + id, bookToEdit);
  }

  deleteBook(id: number): Observable<IBookId> {
    return this.http.delete<IBookId>(this.baseUrl + '/delete/' + id);
  }
}
