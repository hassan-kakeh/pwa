import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pwa-test';
  todos!: any;
  readonly VAPID_PUBLIC_KEY =
    'BK6LlOn86fkAtLt9CZsSEVLlwOk93nD7PxPLI2WMcRn1-dKHrMXtGxk9K1Mqn55DPCVVSBhlKU_GgiA9_Bg1MiM';
  constructor(private swPush: SwPush, private http: HttpClient) {}
  ngOnInit(): void {
    if ('contacts' in navigator) {
      console.log('Supported');
    }
  }
  onSubscription() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {
        console.log('Notification Subscription', sub);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  loadTodos() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((data) => {
        console.log(data);
        this.todos = data;
      });
  }
  comments: any;

  loadComments() {
    this.comments = this.http.get(
      'https://jsonplaceholder.typicode.com/comments'
    );
  }
}
