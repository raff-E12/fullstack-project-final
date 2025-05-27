import React from 'react'
import Swipper from "swiper"
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image1 from "../assets/imgs/hero-1.jpg"
import Image2 from "../assets/imgs/hero-2.jpg"
import Image3 from "../assets/imgs/hero-3.jpg"

const swiper = new Swipper('.swiper', {
  modules: [Navigation, Pagination],
  direction: "horizontal",
  loop: true,
  autoplay: true,
  navigation:{
    nextEl:".swiper-button-next",
    prevEl:".swiper-button-prev"
  },
  pagination: {
    el: '.swiper-pagination',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  }
});

export default function Sliders() {
  return (
    <>
    <div className='slider-container'>
          <div className="swiper">
        <div className="swiper-wrapper">
            <div className="swiper-slide">
                <div className='img-box' style={{backgroundImage:`url(${Image1})`}}>
                   <div className='bg-retro'></div>
                   <div className='text-slider'>
                     <h3>Test Slider #1</h3>
                     <p>Fashio Week 1#</p>
                     <button className='btn-slider'>Shop Now</button>
                   </div>
                </div>
            </div>
            <div className="swiper-slide">
                <div className='img-box' style={{backgroundImage:`url(${Image2})`}}>
                   <div className='bg-retro'></div>
                   <div className='text-slider'>
                     <h3>Test Slider #2</h3>
                     <p>Fashio Week 2#</p>
                     <button className='btn-slider'>Shop Now</button>
                   </div>
                </div>
            </div>
            <div className="swiper-slide">
                <div className='img-box' style={{backgroundImage:`url(${Image3})`}}>
                   <div className='bg-retro'></div>
                   <div className='text-slider'>
                     <h3>Test Slider #3</h3>
                     <p>Fashio Week 3#</p>
                     <button className='btn-slider'>Shop Now</button>
                   </div>
                </div>
            </div>
        </div>

        <div className="swiper-scrollbar"></div>
    </div>
     <div  className='options-sc'>
            <div className="swiper-pagination"></div>
            <div className='btns-slider'>
                <div className="swiper-button-prev"><i class="bi bi-arrow-left"></i></div>
                <div className="swiper-button-next"><i class="bi bi-arrow-right"></i></div>
            </div>
        </div>
    </div>
    </>
  )
}
