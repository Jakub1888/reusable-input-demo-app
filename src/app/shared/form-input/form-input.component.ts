import { Component, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
	selector: 'app-form-input',
	templateUrl: './form-input.component.html',
	styleUrls: ['./form-input.component.css']
})
export class FormInputComponent {
	@Input() control!: FormControl;
	@Input() isTextArea = false;
	@Input() type = 'text';
	@Input() label = '';
	@Input() placeholder = '';
	@Input() className = '';
	@Input() icon!: string;
	@Input() requiredErrorMessage = '';
	@Input() patternErrorMessage = '';

	get isInvalid(): boolean {
		return this.control.invalid && (this.control.dirty || this.control.touched);
	}

	get validationErrors(): ValidationErrors | null {
		return this.control.errors;
	}
}
