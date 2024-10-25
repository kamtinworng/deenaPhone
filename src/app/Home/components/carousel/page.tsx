"use client";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Mobile from "../../../../../libs/mobile";
import "@mantine/carousel/styles.css";
function Banner() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const images = ["/banner.jpg", "/image1.jpg"];

  return (
    <div>
      <Carousel
        withIndicators
        loop
        height={Mobile() ? 200 : 500}
        align="start"
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        m={"md"}
      >
        {images.map((image, index) => {
          return (
            <Carousel.Slide key={index}>
              <Image fit="fill" alt="image Carousel" src={image} />
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Banner;
