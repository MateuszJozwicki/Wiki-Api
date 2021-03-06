import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleItemComponent } from './components/article-item/article-item.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';

const routes: Routes = [
  { path: 'articles-list', component: ArticlesListComponent },
  { path: 'article/:id', component: ArticleItemComponent },
  { path: '', pathMatch: 'full', redirectTo: 'articles-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
