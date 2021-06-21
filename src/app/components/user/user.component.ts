import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {UserInterface} from "../../interfaces/user-interface";
import {UserActions} from "../../interfaces/user-actions";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userActions = UserActions;

  @Input() user!: UserInterface;

  @Output() userToAction = new EventEmitter<{user: UserInterface, action: UserActions}>();


  constructor() { }

  ngOnInit(): void {
  }

  emitUserAction(userAction: UserActions): void {
    this.userToAction.emit({user: this.user, action: userAction})
  }

}
