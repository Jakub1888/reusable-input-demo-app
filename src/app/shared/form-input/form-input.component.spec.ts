import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { FormInputComponent } from './form-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('FormInputComponent', () => {
	let spectator: Spectator<FormInputComponent>;
	const createComponent = createComponentFactory({
		component: FormInputComponent,
		imports: [
			ReactiveFormsModule,
			MatFormFieldModule,
			MatInputModule,
			MatIconModule,
			MatTooltipModule
		]
	});

	beforeEach(() => {
		spectator = createComponent({
			props: {
				control: new FormControl('')
			}
		});
	});

	it('should render input field when isTextArea is false', () => {
		spectator.component.isTextArea = false;
		spectator.detectChanges();

		expect(spectator.query('input')).toBeTruthy();
		expect(spectator.query('textarea')).toBeFalsy();
	});

	it('should render textarea when isTextArea is true', () => {
		spectator.component.isTextArea = true;
		spectator.detectChanges();

		expect(spectator.query('textarea')).toBeTruthy();
		expect(spectator.query('input')).toBeFalsy();
	});

	it('should display minlength error message correctly', () => {
		const control = new FormControl('', [Validators.required, Validators.minLength(3)]);
		spectator.component.control = control;
		spectator.component.label = 'Test Field';
		spectator.component.patternErrorMessage = 'Invalid pattern.';
		spectator.detectChanges();

		control.markAsTouched();
		control.setValue('Us');
		spectator.detectChanges();

		expect(spectator.query('.mat-error')).toHaveText(
			'Test Field must have at least 3 characters'
		);
	});

	it('should display required error message correctly', () => {
		const control = new FormControl('', [Validators.required]);
		spectator.component.control = control;
		spectator.component.label = 'Test Field';
		spectator.component.requiredErrorMessage = 'This field is required.';
		spectator.detectChanges();

		control.markAsTouched();
		control.setValue('');
		spectator.detectChanges();

		expect(spectator.query('.mat-error')).toHaveText('This field is required.');
	});

	it('should display pattern error message correctly', () => {
		const control = new FormControl('', [
			Validators.required,
			Validators.pattern(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/)
		]);
		spectator.component.control = control;
		spectator.component.label = 'Test Field';
		spectator.component.requiredErrorMessage =
			'Password must contain at least one digit, one uppercase and one lowercase letter';
		spectator.detectChanges();

		control.markAsTouched();
		control.setValue('');
		spectator.detectChanges();

		expect(spectator.query('.mat-error')).toHaveText(
			'Password must contain at least one digit, one uppercase and one lowercase letter'
		);
	});
});
