import { Component } from '@angular/core';
import { Amplify, Analytics  } from 'aws-amplify';

import awsExports from '../aws-exports';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
  public formFields = {
    signUp: {
      username: {
        placeholder: 'Enter Your Email Here',
        isRequired: true,
        label: 'Username:',
        type: 'username'
      },
      email : {
        placeholder: 'Enter Your Email Here',
        isRequired: true,
        label: 'Email:',
        type: 'email'
      },
      birthday: {
        placeholder: 'Enter Your Birthday Here',
        isRequired: true,
        label: 'Birthday:',
        type: 'date'
      },
      phone_number: {
        placeholder: 'Enter Your Phone Number Here',
        isRequired: true,
        label: 'Phone Number:',
        type: 'phone_number'
      },
      locale : {
        placeholder: 'Enter Your Locale Here',
        isRequired: true,
        label: 'Locale:'
      },

    },
  };
}