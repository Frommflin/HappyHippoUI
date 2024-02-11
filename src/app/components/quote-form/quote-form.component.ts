import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuote } from 'src/app/models/quote.model';
import { QuoteService } from 'src/app/services/quote.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'hippo-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.sass']
})
export class QuoteFormComponent implements OnInit {
  quote: IQuote = {
    quoteText: '',
    author: '',
    userId: ''
  }
  quoteId: number = 0;
  newQuote: boolean = true;

  constructor(private quoteService: QuoteService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (response) => {
        if (response == null || response == '') {
          this.router.navigate(['/home'])
        } else {
          this.quote.userId = response
        }
      }
    })

    this.route.queryParams.subscribe((params) => {
      if (params['id'] != null){
        this.newQuote = false;
        this.quoteId = params['id'];
        this.getQuoteById();
      } else {
        this.newQuote = true;
      }
    })
  }

  addNewQuote() {
    this.quoteService.addQuote(this.quote).subscribe({
      next: () => this.router.navigate(['/quotes'])
    });
  }

  getQuoteById(){
    //Collect quote with incoming id from db and update this.quote
    this.quoteService.getQuoteById(this.quoteId).subscribe({
      next: (response) => this.quote = response
    });
  }

  editQuote(){
    this.quoteService.editQuote(this.quoteId, this.quote).subscribe({
      next: () =>  this.router.navigate(['/quotes'])
    });
  }
}
