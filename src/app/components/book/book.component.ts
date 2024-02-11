import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBookId } from '../../models/book.model';

@Component({
  selector: 'hippo-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent {
  @Input() bookDetails!: IBookId;
  @Output() delete = new EventEmitter();

  deleteClicked(){
    this.delete.emit();
  }
}
