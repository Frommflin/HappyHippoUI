import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuoteId } from 'src/app/models/quote.model';
import { QuoteService } from 'src/app/services/quote.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'hippo-quote-catalog',
  templateUrl: './quote-catalog.component.html',
  styleUrls: ['./quote-catalog.component.sass']
})
export class QuoteCatalogComponent {
  user: string = '';
  quotes: IQuoteId[] = [];
  limitReached: boolean = false;

  constructor(private userService: UserService, private quoteService: QuoteService, private router: Router) { }

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (response) => {
        if (response == null || response == '') {
          this.router.navigate(['/home'])
        } else {
          this.user = response
          this.collectQuotes()
        }
      }
    })
  }

  collectQuotes() {
    this.quoteService.getQuotes(this.user).subscribe({
      next: (response) => {
        this.quotes = response

        if (response.length >= 5) {
          this.limitReached = true
        } else {
          this.limitReached = false
        }
      }
    })
  }

  deleteQuote(quote: IQuoteId){
    this.quoteService.deleteQuote(quote.id).subscribe({
      next: () => this.collectQuotes()
    })
  }
}
