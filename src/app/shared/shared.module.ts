import {NgModule} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import { PhotoDndDirective } from './directives/photo-dnd.directive';
import { PhotoDndComponent } from './components/photo-dnd/photo-dnd.component';
import {CommonModule} from "@angular/common";
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./guards/auth.guard";
import {ProfileGuard} from "./guards/profile.guard";
import { LoaderComponent } from './components/loader/loader.component';
import { DatePipe } from './pipes/date.pipe';
import {MatPaginatorModule} from "@angular/material/paginator";
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    PhotoDndDirective,
    PhotoDndComponent,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoaderComponent,
    DatePipe,
    SnackbarComponent,
  ],
  declarations: [
    PhotoDndDirective,
    PhotoDndComponent,
    LoaderComponent,
    DatePipe,
    SnackbarComponent,
  ],
  providers: [AuthGuard, ProfileGuard],
})
export class SharedModule {

}
