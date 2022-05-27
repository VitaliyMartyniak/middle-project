import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UserData} from "../../../shared/interfaces";

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserBadgeComponent {

  @Input() user: UserData;
  @Input() isLoading: boolean;

  constructor() { }

}
