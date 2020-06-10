import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'app/models/book.model';
import { ViewMode } from 'app/models/view-mode.model';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss'],
})
export class HomeDetailsComponent {
  // This value will be pulled from a parent component
  @Input() book: Book;

  // This value will push to a parent component
  @Output() viewMode: EventEmitter<ViewMode> = new EventEmitter();

  onEditClick(): void {
    this.viewMode.emit(ViewMode.Edit);
    // throw new Error('Not yet implemented!');
  }

  onCancelClick(): void {
    this.viewMode.emit(ViewMode.Table);
    // throw new Error('Not yet implemented!');
  }
}
