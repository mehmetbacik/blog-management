"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { carouselData } from "@/data/carouselData";
import Link from "next/link";

const HeroCarousel = () => {
  return (
    <div className="heroSlider__content">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        /*pagination={{ clickable: true }}*/
        /*navigation*/
      >
        {carouselData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="heroSlider__slide--wrapper">
              <img src={slide.image} alt={slide.title} className="heroSlider__slide--image" />
              <div className="heroSlider__slide--content">
                <h2 className="heroSlider__slide--title">{slide.title}</h2>
                <p className="heroSlider__slide--description">{slide.description}</p>
                <Link href={slide.url} className="heroSlider__slide--button">
                  Read More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
