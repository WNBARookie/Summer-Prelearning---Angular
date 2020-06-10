import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { ViewMode } from '../../../models/view-mode.model';
import { HomeListComponent } from '../home-list/home-list.component';
import { HomeDetailsComponent } from '../home-details/home-details.component';
import { HomeFormComponent } from '../home-form/home-form.component';
import { Book } from '../../../models/book.model';
import { SaveBook } from 'app/models/saveBook.model';
import { BookService } from 'app/services/book/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(HomeListComponent, { static: true })
  homeList: HomeListComponent;
  @ViewChild(HomeDetailsComponent, { static: false })
  homeDetails: HomeDetailsComponent;
  @ViewChild(HomeFormComponent, { static: false })
  homeForm: HomeFormComponent;

  viewMode: ViewMode;
  books: Book[];
  selectedBook: Book;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.viewMode = ViewMode.Table;
    this.fetchBooks();
    // throw new Error('Not yet implemented!');
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
    // throw new Error('Not yet implemented!');
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
    this.viewMode = ViewMode.Details;
    // throw new Error('Not yet implemented!');
  }

  viewModeChanged(viewMode: ViewMode): void {
    this.viewMode = viewMode;
    // throw new Error('Not yet implemented!');
  }

  addBook(): void {
    this.selectedBook = {
      id: 0,
      title: '',
      author: '',
      genre: '',
      publisher: '',
    };
    this.viewMode = ViewMode.Add;
    this.viewModeChanged(this.viewMode);
    // throw new Error('Not yet implemented!');
  }

  saveBook(payload: SaveBook): void {
    if (payload.type === 'save') {
      this.bookService.addBook(payload.book).subscribe(
        (response) => {
          console.log('Success!', response);
        },
        (error) => console.error('Error', error)
      );
    } else if (payload.type === 'update') {
      this.bookService.updateBook(payload.book).subscribe(
        (response) => {
          console.log('Success!', response);
        },
        (error) => console.error('Error', error)
      );
    }
    this.fetchBooks();
    // throw new Error('Not yet implemented!');
  }

  get detailsEnabled(): boolean {
    return this.viewMode === 'Details';
    // throw new Error('Not yet implemented!');
  }
  get formEnabled(): boolean {
    return this.viewMode === 'Add' || this.viewMode === 'Edit';
    // throw new Error('Not yet implemented!');
  }
}
