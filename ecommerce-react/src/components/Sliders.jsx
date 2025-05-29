import { useEffect } from "react";
import Swiper from "swiper";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image1 from "../assets/imgs/hero-1.jpg";
import Image2 from "../assets/imgs/hero-2.jpg";
import Image3 from "../assets/imgs/hero-3.jpg";

import "../style/Slider.css";

export default function Sliders() {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      modules: [Navigation, Pagination, EffectFade],
      loop: true,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 1000,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    return () => {
      swiper.destroy(true, true);
    };
  }, []);

  return (
    <>
      <div className="slider-container">
        <div className="swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div
                className="img-box"
                style={{ backgroundImage: `url(${Image1})` }}
              >
                <div className="bg-retro"></div>
                <div className="container h-100 d-flex align-items-center justify-content-start">
                  <div className="text-slider">
                    <h3>Test Slider #1</h3>
                    <p>Fashio Week 1#</p>
                    <button className="btn-slider">Shop Now</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div
                className="img-box"
                style={{ backgroundImage: `url(${Image2})` }}
              >
                <div className="bg-retro"></div>
                <div className="container h-100 d-flex align-items-center justify-content-start">
                  <div className="text-slider">
                    <h3>Test Slider #2</h3>
                    <p>Fashio Week 2#</p>
                    <button className="btn-slider">Shop Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="options-sc">
          <div className="container d-flex justify-content-between align-items-end">
            <div className="swiper-pagination"></div>
            <div className="btns-slider">
              <div className="swiper-button-prev">
                <i className="bi bi-arrow-left"></i>
              </div>
              <div className="swiper-button-next">
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
