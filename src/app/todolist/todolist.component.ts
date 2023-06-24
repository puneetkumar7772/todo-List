import { Component, Input } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {

  title = "To Do List";
  first = "Completed List";
  text: any;
  icon = faTrash
  add = faPlus
  check = faCircleCheck
  edit = faEdit
  show : boolean = true;
  name: any[] = []
  editItemId: any;

  ngOnInit() {
    const data = localStorage.getItem('name');
    if (data) {
      this.name = JSON.parse(data);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('name', JSON.stringify(this.name));
  }

  changeInput(input: any) {
    console.log("input", input)
    this.text = input.trim();     // to ignore white space starting and ending 
    console.log("text length", this.text, this.text.length)
  }

  addTask(data: string) {
    // console.log(data, data.length)
    if (data) {
      this.name.push({ id: this.name.length, name: data });  //psh data in name array
      this.text = "";
    }
    this.saveToLocalStorage();
  }

  removeTask(id: number) {
    this.name = this.name.filter(item => item.id !== id); //filter data in array
    console.log("deleted");
    this.saveToLocalStorage();
  }

  completedTask(id: number) {
    let item = this.name.filter(item => item.id === id)[0];
    item.iscomplete = true;
    console.log("add");
    this.saveToLocalStorage();
  }

  uncheckTask(id: number) {
    let item = this.name.filter(item => item.id === id)[0];
    item.iscomplete = false;
    this.saveToLocalStorage();
  }

  updateTask(data: string) {
    this.show = true;
    console.log("updatetask data", data);
    console.log("name array", this.name);
    const filteredItem = this.name.filter((item) => {
      return item.id === this.editItemId
    })
    console.log("filteredItem", filteredItem)
    filteredItem[0].name = data;
    this.text = "";
    this.saveToLocalStorage();
  }

  editTask(item: any) {
    this.show = false;
    console.log("edit item", item)
    this.text = item.name;
    this.editItemId = item.id;
  }

}

