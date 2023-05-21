import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	authForm!: FormGroup;

	constructor(private fb: FormBuilder) {
		this.initForm();
	}

	onSubmit(): void {
		console.log(this.authForm.value);
	}

	private initForm(): void {
		this.authForm = this.fb.group({
			username: new FormControl('', {
				nonNullable: true,
				validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
			}),
			password: new FormControl('', {
				nonNullable: true,
				validators: [
					Validators.required,
					Validators.pattern(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/)
				]
			})
		});
	}
}
