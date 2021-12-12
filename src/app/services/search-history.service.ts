import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchHistoryService {
  searchHistoryItems$ = new BehaviorSubject<any>([]);
  key = 'searchHistory';

  getSearchHistory(): string {
    const history = localStorage.getItem(this.key);
    return history || '[]';
  }
  initHistory() {
    this.searchHistoryItems$.next(JSON.parse(this.getSearchHistory()));
  }
  addToHistory(searchQuery: string) {
    const parsedHistory = JSON.parse(this.getSearchHistory());

    parsedHistory.push(searchQuery);
    localStorage.setItem(this.key, JSON.stringify(parsedHistory));

    this.searchHistoryItems$.next(JSON.parse(this.getSearchHistory()));
  }

  constructor() {}
}
