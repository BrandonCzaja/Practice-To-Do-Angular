import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todos: Array<any> = [];
  baseUrl: string = 'http://localhost:3000/todos';

  async getTodos() {
    const response = await fetch(this.baseUrl);
    const data = await response.json();
    this.todos = await data;
  }

  ngOnInit() {
    this.getTodos();
  }
}
