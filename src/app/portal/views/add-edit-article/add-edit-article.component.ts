import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileHandle} from "../../../shared/directives/photo-dnd.directive";

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.scss']
})
export class AddEditArticleComponent {
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      text: new FormControl('', [
        Validators.required,
      ]),
      photo: new FormControl(null, [
        Validators.required,
      ]),
    });
    // console.log(this.form);
  }

  submit() {
    const formData = {...this.form.value}
    // console.log(formData);
  }

  updateFile(file: FileHandle | null) {
    // console.log(file);
    this.form.patchValue({photo: file});
    this.form.get('photo')?.markAsTouched();
  }
}
