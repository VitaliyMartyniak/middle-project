import {Component, OnDestroy, OnInit} from '@angular/core';
import {userSelector} from "../../../../store/selectors/auth";
import {Observable, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {UserData} from "../../../../shared/interfaces";
import {profileLoadingSelector} from "../../../../store/selectors/profile";

@Component({
  selector: 'app-profile-landing',
  templateUrl: './profile-landing.component.html',
  styleUrls: ['./profile-landing.component.scss']
})
export class ProfileLandingComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean> = this.store.pipe(select(profileLoadingSelector));
  private userSub: Subscription;
  user: UserData;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.userSub = this.store.select(userSelector).subscribe((user: UserData): void => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
