import { VirtualKeyboardComponent } from './../../../shared/components/virtual-keyboard/virtual-keyboard.component';
import { formatDate } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { LoadingSpinnerService } from 'src/app/modules/shared/_services/loading-spinner.service';
import { countries } from 'src/app/modules/shared/_stores/country-store';
import { DateRangeValidator } from 'src/app/modules/shared/_validators/date-range-validator';
import { PersonDetails } from 'src/app/_models/person/person-details';
import { Country } from 'src/app/_models/shared/country';
import { PersonService } from 'src/app/_services/person.service';

@Component({
  selector: 'app-person-upsert',
  templateUrl: './person-upsert.component.html',
  styleUrls: ['./person-upsert.component.sass']
})
export class PersonUpsertComponent implements OnInit {
  @Input()selectedPerson: PersonDetails | undefined;

  @Output() close = new EventEmitter();
  @Output() personAdded = new EventEmitter<PersonDetails>();
  @Output() personUpdated = new EventEmitter<PersonDetails>();

  @ViewChild('virtualKeyboard') virtualKeyboardElement!: VirtualKeyboardComponent;

  personForm!: FormGroup;
  countries: Country[] = countries;
  activeFormControl?: AbstractControl;

  constructor(private personService: PersonService, private loader: LoadingSpinnerService,
    private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.personForm = new FormGroup({
      name: new FormControl(this.selectedPerson?.name, [Validators.required, Validators.maxLength(100)]),
      email: new FormControl(this.selectedPerson?.email, [Validators.required, Validators.pattern(/^[\w\-\.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/)]),
      dob: new FormControl(this.selectedPerson?.dob != null ? formatDate(this.selectedPerson?.dob, 'yyyy-MM-dd', 'en') : null, [Validators.required, DateRangeValidator(new Date("1900-01-01T00:00:00.000Z"), new Date())]),
      country: new FormControl(this.selectedPerson?.country, [Validators.required])
    });
  }

  cancel() {
    this.close.emit();
  }

  submit() {
    if (this.personForm.valid){
      this.loader.start();
      const personToSubmit: PersonDetails = {
        id: this.selectedPerson?.id,
        name: this.personForm.controls['name'].value,
        email: this.personForm.controls['email'].value,
        dob: this.personForm.controls['dob'].value,
        country: this.personForm.controls['country'].value
      };
      if (!this.selectedPerson) {
        this.personService.post(personToSubmit).pipe(finalize(() => this.loader.stop())).subscribe(result => {
          this.personAdded.emit(result);
        })
      }
      else {
        this.personService.update(personToSubmit).pipe(finalize(() => this.loader.stop())).subscribe(result => {
          this.personUpdated.emit(result);
        })
      }
    }
  }

  onInputChange(event: any) {
    //set keyboard value to match input
    this.virtualKeyboardElement.keyboard.setInput(event.target.value);
  };

  onInputFocus(formControlName: string) {
    //show keyboard on input focus
    this.activeFormControl = this.personForm.controls[formControlName];
    //set keyboard value to match input
    this.virtualKeyboardElement.keyboard.setInput(this.activeFormControl.value);

    //make an extra space for the keyboard
    this.renderer.setStyle(this.elRef.nativeElement.parentElement.parentElement.parentElement, 'padding-bottom', '230px');
  }

  onInputBlur(event: any) {
    if (this.virtualKeyboardElement.isKeyboardClick) {
      //keep focus if it is a keyboard click
      event.target.focus();
    }
    else {
      //hide keyboard when input blurred
      this.activeFormControl = undefined;
      //remove keyboard's extra space
      this.renderer.removeStyle(this.elRef.nativeElement.parentElement.parentElement.parentElement, 'padding-bottom');
    }
  }
}
