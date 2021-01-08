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

  // Properties that Bind with Edit Form
  editTitle: string = '';
  editBody: string = '';
  editId: number = 0;

  // Function to get list of To Dos from backend
  async getTodos() {
    const response = await fetch(this.baseUrl);
    const data = await response.json();
    this.todos = await data;
  }

  ///////////
  // CREATE
  //////////
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

    // Get the updated list and then reset the form
    this.getTodos();
    this.createTitle = '';
    this.createBody = '';
  }

  ////////
  // EDIT
  ////////
  // Edit todos
  editSelect(todo) {
    this.editId = todo.id;
    this.editTitle = todo.title;
    this.editBody = todo.body;
  }

  // Updates the selected todo with form data
  async updateTodo() {
    await fetch(this.baseUrl + '/' + this.editId, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.editTitle,
        body: this.editBody,
      }),
    });
    // Update todo list with edited todo then reset the form
    this.getTodos();
    this.editTitle = '';
    this.editBody = '';
    this.editId = 0;
  }
  // This function runs when the component Loads (think React.useEffect)
  ngOnInit() {
    this.getTodos();
  }
}
