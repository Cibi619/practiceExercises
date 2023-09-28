import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PracticeExercises';
  hide = true;
  //countryCodeRegex = /^(\+?\d{1,3}|\d{1,4})$/;
  phoneNumberRegex = '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})';
  myForm: FormGroup | any;
  formErrors: any;
  constructor(private fb: FormBuilder){}
  ngOnInit() {
      this.myForm = this.fb.group({
          firstName: [{value: null, disabled: false}, Validators.required],
          lastName:  {value: null, disabled: false},
          address: this.fb.group({
            street: {value: null, disabled: false},
            city: [{value: null, disabled: false}],
            state: [{value: null, disabled: false}],
            pincode: [{value: null, disabled: false}]
          }),
          contact: this.fb.group({
          phoneNo: this.fb.array([], [Validators.required]),
          email: [{value: null, disabled: false},[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          password: [{value: null, disabled: false},[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
          })
      });

      this.formErrors = {
        firstName:        {},
        email:            {},
        password:         {}
      };

      this.myForm.valueChanges.subscribe(console.log);
      this.onFormValuesChanged();
  }
  get firstName() {
    return this.myForm.get('firstName');
  }
  get email() {
    return this.myForm.get('email');
  }
  get password() {
    return this.myForm.get('password');
  }
  get phoneNo() {
    return this.myForm.get('contact.phoneNo');
  }
  get phoneForms() {
      return this.myForm.get('contact.phoneNo') as FormArray;
  }
  onFormValuesChanged() {
      for (const field in this.formErrors) {
        if ( !this.formErrors.hasOwnProperty(field) )
        {
            continue;
        }
        // Clear previous errors
        this.formErrors[field] = {};
        // Get the control
        const control = this.myForm.get(field);
        if ( control && control.dirty && !control.valid )
        {
            this.formErrors[field] = control.errors;
        }
      }
  }
  addPhone() {
      const phone = this.fb.group({
        countryCode: [],
        number: [{value: null, disabled: false},[Validators.required,Validators.pattern('^[0-9]{10}$')]]
      })
      this.phoneForms.push(phone);
  }
  deletePhone(i: any) {
    this.phoneForms.removeAt(i);
  }
    formData = [
    {
     Continent: "Africa",
     Countries: [
      "Nigeria",
      "Egypt",
      "Ethiopia"
     ]
    },
    {
     Continent: "Europe",
     Countries: [
      "Sweden",
      "Italy",
      "Hungary"
     ]
    },
    {
     Continent: "North America",
     Countries: [
      "United States of America",
      "Canada",
      "Mexico"
     ]
    },
    {
     Continent: "South America",
     Countries: [
      "Peru",
      "Argentina",
      "Colombia"
     ]
    },
    {
     Continent: "Asia",
     Countries: [
      "Malaysia",
      "Iran",
      "Japan",
      "India"
     ]
    },
    {
     Continent: "Australia/Oceania",
     Countries: [
      "Fiji",
      "Australia",
      "New Zealand"
     ]
    }
    ];
    ifContinentSelected: boolean = false;
    selectedContinent?: string;
  get filteredFormData() {
    // selectedContinent would be undefined if no option is selected
    // therefore, we return all of the continents
    if (!this.selectedContinent) return this.formData;
    // filter out all of the continents that don't match the criteria
    console.log(this.formData.filter(entry => entry.Continent === this.selectedContinent));
    
    return this.formData.filter(entry => entry.Continent === this.selectedContinent);
  }
  getCountries(val: any) {
    this.ifContinentSelected = true;
    if (val.value == undefined)
      this.ifContinentSelected = false;
      
    console.log(val);
    
  }
  formSubmit() {
      console.log(this.myForm.value);
      
  }
  selected = '944';
}
