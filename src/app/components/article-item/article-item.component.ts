import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss'],
})
export class ArticleItemComponent implements OnInit {
  article: any;
  languages: any;
  articleKey = '';
  isLoading = true;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.articleService
        .getArticleDetails(params['id'])
        .subscribe((article) => {
          this.articleKey = article.key;
          this.article = article;
          this.isLoading = false;
        });
      this.articleService
        .getArticleLanguages(params['id'])
        .subscribe((languages) => {
          this.languages = [...languages, { code: 'pl', name: 'Polski' }];
        });
    });
  }

  changeLanguage(lang: string) {
    this.isLoading = true;
    this.articleService.getArticleDetails(this.articleKey, lang).subscribe(
      (article) => {
        this.article = article;
        this.isLoading = false;
      },
      (err) => {
        this.article = null;
        this.isLoading = false;
      }
    );
  }

  constructor(
    private articleService: ArticlesService,
    private route: ActivatedRoute
  ) {}
}
