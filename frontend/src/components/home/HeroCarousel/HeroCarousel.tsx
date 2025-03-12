"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  { id: 1, title: "Discover the World", image: "/carousel/Carousel-1.jpg" },
  {
    id: 2,
    title: "Your Journey Begins",
    image: "/carousel/Carousel-2.jpg",
  },
  { id: 3, title: "Travel with Ease", image: "/carousel/Carousel-3.jpg" },
  { id: 4, title: "Discover the World", image: "/carousel/Carousel-4.jpg" },
  {
    id: 5,
    title: "Your Journey Begins",
    image: "/carousel/Carousel-5.jpg",
  },
];

const HeroCarousel = () => {
  return (
    <div className="heroSlider">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide">
              <img src={slide.image} alt={slide.title} className="slideImage" />
              <h2 className="title">{slide.title}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
