import { Component, OnInit } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  SwiperOptions,
} from 'swiper';
import { CoreConstants } from '../core.constants';
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  daysRemaining: number = 0;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    autoHeight: true,
    navigation: true,
    centeredSlides: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    loop: true,
  };
  ngOnInit(): void {
    this.calculateDaysRemaining();
  }
  calculateDaysRemaining() {
    const finalsDate = new Date(CoreConstants.finalsDate);
    const todaysDate = new Date(
      new Date().getMonth() +
        1 +
        '/' +
        new Date().getDate() +
        '/' +
        new Date().getFullYear()
    );
    // To calculate the time difference of two dates
    var Difference_In_Time = finalsDate.getTime() - todaysDate.getTime();
    // To calculate the no. of days between two dates
    this.daysRemaining = Difference_In_Time / (1000 * 3600 * 24);
    // this.daysRemaining = 0; // Uncomment this to view the slider
  }
}
