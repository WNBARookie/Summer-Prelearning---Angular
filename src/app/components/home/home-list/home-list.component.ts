import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../../models/book.model';
import { InputTextEvent } from '../../../models/inputTextEvent.model';
import { ViewMode } from '../../../models/view-mode.model';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
})
export class HomeListComponent implements OnInit {
  // These values will be pulled from a parent component
  @Input() books: Book[];
  @Input() viewMode: ViewMode;

  // This value will push to a parent component
  @Output() selectBook: EventEmitter<Book> = new EventEmitter<Book>();

  book: Book;
  filterText: string;

  constructor() {}

  ngOnInit() {}

  get filteredBooks(): Book[] {
    let filtered: Book[] = [];
    this.books.forEach((book) => {
      const containsAuthor: boolean =
        book.author.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1;
      const containsTitle: boolean =
        book.title.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1;
      const containsPublisher: boolean =
        book.publisher.toLowerCase().indexOf(this.filterText.toLowerCase()) >
        -1;
      const containsGenre: boolean =
        book.genre.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1;

      if (
        containsAuthor ||
        containsTitle ||
        containsGenre ||
        containsPublisher
      ) {
        filtered.push(book);
      }
    });

    return filtered;
    // throw new Error('Not yet implemented!');
  }

  onSearch(search: InputTextEvent): void {
    this.filterText = search.target.value;
    if (this.filterText === '') this.filterText = 'search text';
    // throw new Error('Not yet implemented!');
  }

  onSelectBook(book: Book): void {
    this.book = book;
    this.selectBook.emit(book);
    // throw new Error('Not yet implemented!');
  }

  get canSearch(): boolean {
    return this.viewMode === 'Table' || this.viewMode === 'Details';
    // throw new Error('Not yet implemented!');
  }
}
