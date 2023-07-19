import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService, Restaurant } from '../API.service';
import { Amplify, Analytics } from 'aws-amplify';

/** Subscription type will be inferred from this library */
import { ZenObservable } from 'zen-observable-ts';

//Events
Analytics.autoTrack('event', {
  enable: true,
  events: ['click'],
  selectorPrefix: 'data-amplify-analytics-'
});

//Automatically track sessions
Analytics.autoTrack('session', {
  // REQUIRED, turn on/off the auto tracking
  enable: true,
  // OPTIONAL, the attributes of the event, you can either pass an object or a function 
  // which allows you to define dynamic attributes
  attributes: {
      attr: 'attr'
  },
  // when using function
  // attributes: () => {
  //    const attr = somewhere();
  //    return {
  //        myAttr: attr
  //    }
  // },
  // OPTIONAL, the service provider, by default is the Amazon Pinpoint
  provider: 'AWSPinpoint'
});

Analytics.autoTrack('pageView', {
  enable: true,
  type: 'SPA',
  attributes: {
    url: window.location.origin + window.location.pathname
  },
})

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  public createForm: FormGroup;

  /* declare restaurants variable */
  public restaurants: Array<Restaurant> = [];
  /** Declare subscription variable */
  private subscription: ZenObservable.Subscription | null = null; 

  constructor(private api: APIService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.api.ListRestaurants().then(event => {
      this.restaurants = event.items as Restaurant[];
    });
  
    /* subscribe to new restaurants being created */
    this.subscription = this.api.OnCreateRestaurantListener().subscribe(
      (event: any) => {
        const newRestaurant = event.value.data.onCreateRestaurant;
        this.restaurants = [newRestaurant, ...this.restaurants];
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }

  public onCreate(restaurant: Restaurant) {
    this.api
      .CreateRestaurant(restaurant)
      .then((event) => {
        console.log('item created!');
        this.createForm.reset();
      })
      .catch((e) => {
        console.log('error creating restaurant...', e);
      });
  }
}