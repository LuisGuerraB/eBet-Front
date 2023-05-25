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
export class CarouselComponent implements OnInit{

  @Input() height!: number;
  @Input() images!: string[];
  heightCss!: string;
  carouselWidth!: string;

  ngOnInit(){
    this.heightCss = `${this.height}px`;
    this.carouselWidth = `${this.height * 1.7777}px`;
  }

  sliderConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
  };
}
