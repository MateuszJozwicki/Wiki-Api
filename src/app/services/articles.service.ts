import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { Article } from '../models';

enum AvailableLanguages {
  english = 'en',
  polish = 'pl',
}

interface ArticlesListBe {
  pages: Article[];
}
interface ArticleDetailsBe {
  id: string;
  key: string;
  html: string;
}
interface ArticleLangsBe {
  code: string;
  name: string;
  key: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  defaultLanguage = 'pl';
  language = AvailableLanguages.polish;
  ARTICLES_LIST_URL = 'https://pl.wikipedia.org/w/rest.php/v1/search/page?q=';
  ARTICLE_DETAILS_ULR = 'https://pl.wikipedia.org/w/rest.php/v1/page/';

  articles$ = new BehaviorSubject<Article[]>([]);

  getArticles(query: string) {
    this.http
      .get<ArticlesListBe>(this.ARTICLES_LIST_URL + query)
      .subscribe((res) => this.articles$.next(res.pages));
  }

  getArticleDetails(articleKey: string, lang?: string) {
    return this.http.get<ArticleDetailsBe>(
      `https://${
        lang ? lang : this.defaultLanguage
      }.wikipedia.org/w/rest.php/v1/page/${articleKey}/with_html`
    );
  }
  getArticleLanguages(articleKey: string) {
    return this.http.get<ArticleLangsBe[]>(
      this.ARTICLE_DETAILS_ULR + articleKey + '/links/language'
    );
  }

  constructor(private http: HttpClient) {}
}
