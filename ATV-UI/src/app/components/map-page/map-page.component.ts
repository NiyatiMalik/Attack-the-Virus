import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Router } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    GoogleMapsModule,
    GoogleMap,
    CommonModule,
    RouterModule
  ],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MapPageComponent implements OnInit, AfterViewInit {
  center!: google.maps.LatLngLiteral;
  zoom = 14;
  display!: google.maps.LatLngLiteral;
  mapOptions: google.maps.MapOptions = { disableDefaultUI: true };
  //service!: google.maps.places.PlacesService;
  advMarkers: google.maps.marker.AdvancedMarkerElement[] = [];
  advMarkerPositions: google.maps.LatLngLiteral[] = [];
  places: google.maps.places.Place[] = [];

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformID: Object, private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformID);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.getUserLocation();
      if (this.center)
        this.display = this.center;
      else {
        this.center = { lat: 41.989, lng: -87.65 };
        this.display = this.center;
        // 41.9890722
        // -87.65557
      }
    }
  }

  ngAfterViewInit(): void {

    for (const place of this.places) {
      console.log(place);
    }
  }

  navigationItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Find Your Clinic', route: '/map' },
    { label: 'Avatar', route: '/avatar' },
    { label: 'More Games', route: '/more-games' },
    { label: 'Ask VacciWiz', route: '/info' },  
  ];

  onNavHover(element: HTMLElement) {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  onNavLeave(element: HTMLElement) {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  onNavClick(route: string): void {
    this.router.navigate([route]);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
      this.nearbySearch();
    } else {
      console.error('Geolocation not supported by browser.');
    }
  }


  // Nearby Search
  // Get the places and add them to the array, then we can
  // add an advanced marker for each place to the map?
  // lets try it like google tells us to – async
  async nearbySearch() {
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;

    let center = this.center;

    const request = {
      fields: ['displayName', 'location', 'businessStatus', 'types'],
      locationRestriction: {
        center: center,
        radius: 500,
      },
      includedPrimaryTypes: ['doctor', 'hospital', 'pharmacy', 'drugstore'],
      maxResultCount: 5,
      rankPreference: SearchNearbyRankPreference.DISTANCE,
      language: 'en-US',
      region: 'us',
    };

    const { places } = await Place.searchNearby(request);

    if (places.length) {
      console.log(places);


      places.forEach((place) => {


        let pos: google.maps.LatLngLiteral;
        if (place.location) {
          pos = {
            lat: place.location.lat(),
            lng: place.location.lng(),
          }
          this.advMarkerPositions.push(pos)
        }
        this.places.push(place);
        console.log(this.places[this.places.length - 1].displayName);
      })
      console.log(this.places);
    }

  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng)
      this.center = (event.latLng.toJSON());
  }

  move() {

  }

  navigateToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }
}
