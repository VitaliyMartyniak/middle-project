import {Component, OnDestroy, OnInit} from '@angular/core';
import {userSelector} from "../../../../store/selectors/auth";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-profile-landing',
  templateUrl: './profile-landing.component.html',
  styleUrls: ['./profile-landing.component.scss']
})
export class ProfileLandingComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  user = null;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.userSub = this.store.select(userSelector).subscribe((user: any): void => {
      this.user = user;
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
