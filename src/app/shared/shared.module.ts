import {NgModule} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
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
  ]
})
export class SharedModule {

}
