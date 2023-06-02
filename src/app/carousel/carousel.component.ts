import {Component, Input, OnInit} from '@angular/core';
import {NgFor} from '@angular/common';
import {SlickCarouselModule} from "ngx-slick-carousel";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgFor, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() height!: number;
  @Input() images!: string[];
  heightCss!: string;
  carouselWidth!: string;

  ngOnInit() {

    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  checkScreenSize() {
    let new_height = this.height * (window.innerWidth / window.screen.width);
    this.heightCss = `${new_height}px`;
    this.carouselWidth = `${new_height * 1.7777}px`;
    console.log(this.carouselWidth, new_height);
  }

  sliderConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: false,
    arrows: false,
  };
}
