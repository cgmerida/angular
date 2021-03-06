import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Feedback, ContactType } from "../shared/feedback";
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackCopy: Feedback;
  contactType = ContactType;
  @ViewChild("fform", null) feedbackFormDirective;
  errMess: string;
  loading: boolean = false;
  result: boolean = false;

  formErrors = {
    firstname: '',
    lastname: '',
    telnum: 0,
    email: '',
  };

  validationMessages = {
    firstname: {
      required: 'First name is required.',
      minlength: 'First name must be at least 2 characters long',
      maxlength: 'First name cannot be more than 25 characters long'
    },
    lastname: {
      required: 'Last name is required.',
      minlength: 'Last name must be at least 2 characters long',
      maxlength: 'Last name cannot be more than 25 characters long'
    },
    telnum: {
      required: 'Tel. Num is required.',
      pattern: 'Tel. Num must contain only numbers'
    },
    email: {
      required: 'Email is required.',
      email: 'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [null, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: '',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return 0;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        //Clear previus Error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.loading = true;
    this.result = true;
    this.feedbackCopy = this.feedbackForm.value;

    this.feedbackService.submitFeedback(this.feedbackCopy)
      .subscribe(
        fb => {
          this.loading = false;
          this.feedback = fb;
          setTimeout(() => {
            this.feedback = null;
            this.feedbackCopy = null;
            this.result = false;
          }, 5000);
        },
        errmess => {
          this.errMess = <any>errmess;
          this.feedback = null; this.feedbackCopy = null;
        }
      );


    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: '',
      message: ''
    });

    this.feedbackFormDirective.resetForm();
  }

}
