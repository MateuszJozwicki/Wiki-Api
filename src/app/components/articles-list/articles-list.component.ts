import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SearchHistoryService } from 'src/app/services/search-history.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit {
  articles$ = this.articlesService.articles$;
  historyItems$ = this.historyService.searchHistoryItems$;

  form = this.fb.group({
    searchInput: '',
  });

  constructor(
    private fb: FormBuilder,
    private historyService: SearchHistoryService,
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.historyService.initHistory();
  }

  submit(searchQuery?: string) {
    const query = searchQuery || this.form.controls['searchInput'].value;
    this.articlesService.getArticles(query);
    this.historyService.addToHistory(query);
  }
  goToDetails(articleKey: string) {
    this.router.navigate(['/article', articleKey]);
  }
}
