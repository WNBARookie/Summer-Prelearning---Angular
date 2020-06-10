import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'app/models/book.model';
import { ViewMode } from 'app/models/view-mode.model';
import { Payload } from 'app/models/savePayload.model';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.scss'],
})
export class HomeFormComponent implements OnInit {
  // These values will be pulled from a parent component
  @Input() viewMode: ViewMode;
  @Input() book: Book;

  // These values will push to a parent component
  @Output() viewModeChange: EventEmitter<ViewMode> = new EventEmitter();
  @Output() saveBook: EventEmitter<Payload> = new EventEmitter();

  homeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.homeForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      genre: [''],
      publisher: [''],
    });

    this.updateInputFields();
    // throw new Error('Not yet implemented!');
  }
  updateInputFields(): void {
    if (this.book) {
      this.title.setValue(this.book.title);
      this.author.setValue(this.book.author);
      this.genre.setValue(this.book.genre);
      this.publisher.setValue(this.book.publisher);
    }
  }

  onSaveClick(): void {
    if (this.book.author !== this.homeForm.controls.author.value) {
      this.homeForm.controls.author.markAsDirty();
    }
    if (this.book.title !== this.homeForm.controls.title.value) {
      this.homeForm.controls.title.markAsDirty();
    }
    if (this.book.publisher !== this.homeForm.controls.publisher.value) {
      this.homeForm.controls.publisher.markAsDirty();
    }
    if (this.book.genre !== this.homeForm.controls.genre.value) {
      this.homeForm.controls.genre.markAsDirty();
    }

    if (this.isDifferent) {
      this.book = {
        id: this.book.id,
        author: this.homeForm.controls.author.value,
        title: this.homeForm.controls.title.value,
        genre: this.homeForm.controls.genre.value,
        publisher: this.homeForm.controls.publisher.value,
      };

      this.saveBook.emit(this.constructPayload());
    }

    // this.book = {
    //   id: this.book.id,
    //   author: this.homeForm.controls.author.value,
    //   title: this.homeForm.controls.title.value,
    //   genre: this.homeForm.controls.genre.value,
    //   publisher: this.homeForm.controls.publisher.value,
    // };

    this.viewModeChange.emit(ViewMode.Table);
    // throw new Error('Not yet implemented!');
  }

  constructPayload(): Payload {
    if (this.book.id === 0) {
      return {
        type: 'save',
        book: this.homeForm.value,
      };
    } else {
      return {
        type: 'update',
        book: this.book,
      };
    }
    // throw new Error('Not yet implemented!');
  }

  onCancelClick(): void {
    this.viewModeChange.emit(ViewMode.Table);
    // throw new Error('Not yet implemented!');
  }

  get isDifferent(): boolean {
    let authorEquals = this.book.author === this.homeForm.controls.author.value;
    let titleEquals = this.book.title === this.homeForm.controls.title.value;
    let genreEquals = this.book.genre === this.homeForm.controls.genre.value;
    let publisherEquals =
      this.book.publisher === this.homeForm.controls.publisher.value;

    let formTruthValues = [];
    formTruthValues.push(authorEquals);
    formTruthValues.push(titleEquals);
    formTruthValues.push(genreEquals);
    formTruthValues.push(publisherEquals);

    return formTruthValues.includes(false);
    // throw new Error('Not yet implemented!');
  }

  get title() {
    return this.homeForm.get('title');
  }
  get author() {
    return this.homeForm.get('author');
  }
  get genre() {
    return this.homeForm.get('genre');
  }
  get publisher() {
    return this.homeForm.get('publisher');
  }
}
