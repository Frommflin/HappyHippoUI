import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from 'src/app/models/book.model';

@Component({
  selector: 'hippo-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.sass']
})
export class BookFormComponent implements OnInit {
  newBook: boolean = true;
  book: IBook = {
    title: '',
    author: '',
    year: 0,
    userId: ''
  };
  bookId: number = 0;

  constructor(private bookService: BookService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (response) => {
        if (response == null || response == '') {
          this.router.navigate(['/home'])
        } else {
          this.book.userId = response
        }
      }
    })

    this.route.queryParams.subscribe((params) => {
      if (params['id'] != null){
        this.newBook = false;
        this.bookId = params['id'];
        this.getBookById();
      } else {
        this.newBook = true;
      }
    })

  }

  addNewBook() {
    this.bookService.addBook(this.book).subscribe({
      next: () => this.router.navigate(['/books'])
    });
  }

  getBookById(){
    //Collect book with incoming id from db and update this.book
    this.bookService.getBookById(this.bookId).subscribe({
      next: (response) => this.book = response
    });
  }

  editBook(){
    this.bookService.editBook(this.bookId, this.book).subscribe({
      next: () =>  this.router.navigate(['/books'])
    });
  }
}
