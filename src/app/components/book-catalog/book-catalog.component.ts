import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBookId } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'hippo-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.sass']
})
export class BookCatalogComponent {
  user: string = '';
  books: IBookId[] = [];

  constructor(private userService: UserService, private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (response) => {
        if (response == null || response == '') {
          this.router.navigate(['/home'])
        } else {
          this.user = response
          this.collectBooks();
        }
      }
    })
  }

  collectBooks() {
    this.bookService.getBooks(this.user).subscribe({
      next: (response) => {
        this.books = response
      }
    })
  }

  deleteBook(book: IBookId){
    this.bookService.deleteBook(book.id).subscribe({
      next: () => this.collectBooks()
    })
  }
}
