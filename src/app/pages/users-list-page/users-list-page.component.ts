import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api/api.service";
import {UserInterface} from "../../interfaces/user-interface";
import {UserActions} from "../../interfaces/user-actions";

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss']
})
export class UsersListPageComponent implements OnInit {
  users!: UserInterface[];
  userToEdit!: UserInterface;
  openEditUser: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.list(20).subscribe(({ results }: any) => {
      this.users = results.map((user: any, index: number) => {
        return {
          id: index,
          firstname: user.name.first,
          lastname: user.name.last,
          username: user.login.username,
          photo: user.picture.thumbnail
        }
      })
    });
  }

  handleEvents(event: { user: UserInterface, action: UserActions }) {
    if (event.action === UserActions.EDIT)
      this.setUserToEdit(event.user)
    else this.deleteUser(event.user)
  }
  setUserToEdit(user: UserInterface) {
    this.userToEdit = user;
    this.openEditUser = true;
  }
  deleteUser(userToDelete: UserInterface): void {
    this.users.splice(this.users.findIndex(user => user.id === userToDelete.id), 1)
  }

  updateUser(userToEdit: UserInterface) {
    this.users[this.users.findIndex(user => user.id === userToEdit.id)] = userToEdit
    this.openEditUser = false;
  }
}
