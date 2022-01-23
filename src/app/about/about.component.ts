import { Component, OnInit } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  SwiperOptions,
} from 'swiper';
SwiperCore.use([Autoplay, Pagination, Navigation]);
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}
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
  ngOnInit(): void {}
  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
