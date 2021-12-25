import {NgModule} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import { PhotoDndDirective } from './directives/photo-dnd.directive';
import { PhotoDndComponent } from './components/photo-dnd/photo-dnd.component';
import {CommonModule} from "@angular/common";
import {MatTabsModule} from "@angular/material/tabs";

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
    MatTabsModule,
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
    PhotoDndDirective,
    PhotoDndComponent,
    MatTabsModule,
  ],
  declarations: [
    PhotoDndDirective,
    PhotoDndComponent
  ]
})
export class SharedModule {

}
