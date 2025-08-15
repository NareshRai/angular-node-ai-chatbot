import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AiService {
  constructor(private http: HttpClient) {}

  getAIResponse(prompt: string) {
    return this.http
      .post<any>('http://localhost:3000/chat', { prompt })
      .pipe(map((res) => res?.message || 'No response'));
  }
}
