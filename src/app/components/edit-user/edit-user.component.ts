import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from "../../interfaces/user-interface";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Input() userToEdit!: UserInterface;

  @Output() saveUser = new EventEmitter<UserInterface>();
  @Output() cancelEdit = new EventEmitter();

  editUserForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.editUserForm = this.formBuilder.group({
      id: [this.userToEdit.id, [Validators.required]],
      photo: [this.userToEdit.photo, [Validators.required]],
      firstname: [this.userToEdit.firstname, [Validators.required]],
      lastname: [this.userToEdit.lastname, [Validators.required]],
      username: [this.userToEdit.username, [Validators.required]],
    });

    console.log(this.editUserForm)
  }

  handleSaveUser(): void {
    this.saveUser.emit(this.editUserForm.value);
  }

}
