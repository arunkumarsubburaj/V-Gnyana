import { StudentObj } from 'src/shared/models/shared.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  SwiperOptions,
} from 'swiper';
import { CoreConstants } from '../core.constants';
import { UserService } from '../user.service';
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}
  daysRemaining: number = 0;
  finalistsData!: any;
  myInterval!: any;
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
    this.getFinalists();
    if (this.daysRemaining <= 0) {
      this.myInterval = setInterval(() => {
        this.getFinalists();
      }, 15000);
    }
  }
  async getFinalists() {
    let finalistsData: StudentObj[] = [];
    try {
      const finalists = await this.userService.getFinalists().toPromise();
      for (let index = 0; index < finalists.length; index++) {
        const studentData = finalists[index];
        if (!this.isAlreadyAvailable(studentData.state, finalistsData)) {
          finalistsData.push(studentData);
        }
      }
      this.finalistsData = finalistsData;
      console.log('finalistsData', this.finalistsData);
      this.finalistsData.forEach((element: StudentObj) => {
        if (element?.state) {
          const scoreEleArray = Array.from(
            document.querySelectorAll('#' + element.state.toLowerCase())
          ) as any;
          for (let index = 0; index < scoreEleArray.length; index++) {
            const scoreEle = scoreEleArray[index] as HTMLElement;
            scoreEle.innerText = element.FinalsResult;
          }
        }
      });
    } catch (error) {
      this.finalistsData = null;
    }
  }
  isAlreadyAvailable(value: string, objArray: StudentObj[]) {
    return objArray.some((valueObj) => {
      return valueObj.state == value;
    });
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
  ngOnDestroy(): void {
    if (this.daysRemaining <= 0) {
      window.clearInterval(this.myInterval);
    }
  }
}
