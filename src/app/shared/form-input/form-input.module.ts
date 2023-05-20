import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './form-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [FormInputComponent],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule],
})
export class FormInputModule {}
