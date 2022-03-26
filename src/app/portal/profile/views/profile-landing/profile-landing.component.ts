import {Component, OnDestroy, OnInit} from '@angular/core';
import {userSelector} from "../../../../store/selectors/auth";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {UserData} from "../../../../shared/interfaces";
import {profileLoadingSelector} from "../../../../store/selectors/profile";

@Component({
  selector: 'app-profile-landing',
  templateUrl: './profile-landing.component.html',
  styleUrls: ['./profile-landing.component.scss']
})
export class ProfileLandingComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  user: UserData;
  private isLoadingSub: Subscription;
  isLoading = true;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.userSub = this.store.select(userSelector).subscribe((user: UserData): void => {
      this.user = user;
    });
    this.isLoadingSub = this.store.select(profileLoadingSelector).subscribe((isLoading: boolean): void => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
