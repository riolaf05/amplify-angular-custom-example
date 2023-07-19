import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Amplify } from 'aws-amplify';
import aws_exports from './aws-exports';
import { Auth } from '@aws-amplify/auth';

Amplify.configure(aws_exports);
Auth.configure(aws_exports);


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  import { Analytics } from 'aws-amplify';

Auth.currentUserCredentials().then(credentials => {
  const { identityId } = credentials;
  console.log('identityId', identityId);
  
  Analytics.updateEndpoint({
    // NOTE: All fields are OPTIONAL
    // 12 known properties: "Metrics", "Address", "Location", "EndpointStatus", "RequestId", "OptOut", "ChannelType", "Demographic", "Attributes", "User", "UserPreferences", "EffectiveDate"]

    address: 'email@email.com', // The unique identifier for the recipient. For example, an address could be a device token, email address, or mobile phone number.
    
    attributes: {
      // Custom attributes that your app reports to Amazon Pinpoint. You can use these attributes as selection criteria when you create a segment.
      hobbies: ['piano', 'hiking'] // MUST be an array, even single value
    },
    
    //TODO: ADD USER EMAIL
    channelType: 'APNS', // The channel type. Valid values: APNS, GCM

    // demographic: {
    //   appVersion: 'xxxxxxx', // The version of the application associated with the endpoint.
    //   locale: 'xxxxxx', // The endpoint locale in the following format: The ISO 639-1 alpha-2 code, followed by an underscore, followed by an ISO 3166-1 alpha-2 value
    //   make: 'xxxxxx', // The manufacturer of the endpoint device, such as Apple or Samsung.
    //   model: 'xxxxxx', // The model name or number of the endpoint device, such as iPhone.
    //   modelVersion: 'xxxxxx', // The model version of the endpoint device.
    //   platform: 'xxxxxx', // The platform of the endpoint device, such as iOS or Android.
    //   platformVersion: 'xxxxxx', // The platform version of the endpoint device.
    //   timezone: 'xxxxxx' // The timezone of the endpoint. Specified as a tz database value, such as Americas/Los_Angeles.
    // },

    location: {
      city: 'Milan', // The city where the endpoint is located.
      country: 'ITA', // The two-letter code for the country or region of the endpoint. Specified as an ISO 3166-1 alpha-2 code, such as "US" for the United States. See https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
      latitude: 0, // The latitude of the endpoint location, rounded to one decimal place.
      longitude: 0, // The longitude of the endpoint location, rounded to one decimal place.
      postalCode: '20142', // The postal code or zip code of the endpoint.
      region: 'Lombardia' // The region of the endpoint location. For example, in the United States, this corresponds to a state.
    },

    // User attributes
    userAttributes: {
      interests: ['football', 'basketball', 'AWS'],
      firstName: ['John'],
      // ...
    }
  }).then(() => {console.log('update endpoint success')})
})