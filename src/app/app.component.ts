import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todos: Array<any> = [];
  baseUrl: string = 'http://localhost:3000/todos';

  // Properties to Bind with Create Form
  createTitle: string = '';
  createBody: string = '';

  // Function to get list of To Dos from backend
  async getTodos() {
    const response = await fetch(this.baseUrl);
    const data = await response.json();
    this.todos = await data;
  }

  // Creates a new todo with data from the form input
  async createTodo() {
    await fetch(this.baseUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.createTitle,
        body: this.createBody,
      }),
    });

    // Update the todo list and reset the form
    this.getTodos();
    this.createTitle = '';
    this.createBody = '';
  }

  // This function runs when the component Loads (think React.useEffect)
  ngOnInit() {
    this.getTodos();
  }
}
