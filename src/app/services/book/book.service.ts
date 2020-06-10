import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  url: string = '/assets/mocks/books.json';

  constructor(private http: HttpClient) {}

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.url, book);
    // throw new Error('Not yet implemented!');
  }

  deleteBook(id: string | number): Observable<never> {
    return this.http.delete<never>(this.url + '/?id=' + id);
    // throw new Error('Not yet implemented!');
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.url + '/?id=' + book.id, book);
    //  throw new Error('Not yet implemented!');
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
    // throw new Error('Not yet implemented!');
  }
}
