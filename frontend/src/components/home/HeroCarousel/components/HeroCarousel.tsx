"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { carouselData } from "@/data/carouselData";
import Link from "next/link";
import Image from "next/image";
import CustomTooltip from "@/components/ui/Tooltip";
import { useCharacterLimit } from "@/hooks/useCharacterLimit";

const truncateText = (text: string, limit: number) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const HeroCarousel = () => {
  const charLimit = useCharacterLimit();

  return (
    <div className="heroSlider__content">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {carouselData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="heroSlider__slide--wrapper">
              <Image
                src={slide.image}
                alt={slide.title}
                className="heroSlider__slide--image"
                width={1920}
                height={1080}
                priority
              />
              <div className="heroSlider__slide--content">
                <CustomTooltip text={slide.title} limit={charLimit.title}>
                  <h2 className="heroSlider__slide--title">{truncateText(slide.title, charLimit.title)}</h2>
                </CustomTooltip>

                <CustomTooltip text={slide.description} limit={charLimit.description}>
                  <p className="heroSlider__slide--description">{truncateText(slide.description, charLimit.description)}</p>
                </CustomTooltip>

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
