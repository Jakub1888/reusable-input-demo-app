import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { UntypedFormControl, ValidationErrors } from '@angular/forms';
import { FormInputComponent } from './form-input.component';

describe('FormInputComponent', () => {
	let spectator: Spectator<FormInputComponent>;
	const createComponent = createComponentFactory(FormInputComponent);

	beforeEach(() => {
		spectator = createComponent({
			detectChanges: false, // Disable automatic change detection
			props: {
				control: new UntypedFormControl(),
				isTextArea: false,
				type: 'text',
				label: 'Name',
				placeholder: 'Enter your name',
				className: 'custom-input',
				icon: 'person',
				requiredErrorMessage: 'This field is required',
				patternErrorMessage: 'Invalid input pattern'
			}
		});
	});

	it('should display an input field with provided properties', () => {
		expect(spectator.query('.custom-input')).toExist();
		expect(spectator.query('label')).toHaveText('Name');
		expect(spectator.query('input')).toHaveAttribute('type', 'text');
		expect(spectator.query('input')).toHaveAttribute('placeholder', 'Enter your name');
		expect(spectator.query('mat-icon')).toHaveText('person');
	});

	it('should show validation errors when control is invalid and touched', () => {
		spectator.component.control.setErrors({ required: true });
		spectator.component.control.markAsTouched();
		spectator.detectChanges();

		expect(spectator.query('.mat-error')).toHaveText('This field is required');
	});
});
