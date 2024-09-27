"use client";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Mobile from "../../../../../libs/mobile";
import "@mantine/carousel/styles.css";
function Banner() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  if (Mobile()) return <></>;

  const images = [
    "/banner.jpg",
    "/banner.jpg",
    "/banner.jpg",
    "/banner.jpg",
    "/banner.jpg",
  ];

  return (
    <div>
      <Carousel
        withIndicators
        height={"50vh"}
        loop
        align="start"
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
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
