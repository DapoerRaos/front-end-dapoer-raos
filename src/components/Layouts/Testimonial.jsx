"use client";

import { Avatar } from "@chakra-ui/react";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const sliderRef = useRef(null);
  const testimonials = [
    {
      id: 1,
      content:
        "Saya sangat suka kue kering biji ketapang dari Dapoer Raos! Rasanya gurih dan renyah, pas di lidah. Cocok sekali untuk teman minum teh di sore hari. Pengemasannya juga rapi, jadi kue tetap dalam kondisi baik ketika sampai di rumah. Pasti akan pesan lagi!",
      name: "Wahyuningsih Dwi Setiawati",
      rating: "4/5",
      star: "★ ★ ★ ★ ☆",
    },
    {
      id: 2,
      content:
        "Kue biji ketapang dari Dapoer Raos memang juara! Rasanya autentik dan teksturnya sangat pas, tidak terlalu keras atau lembek. Cocok banget buat camilan sehari-hari. Pelayanannya juga ramah dan cepat. Suka banget sama kue ini, highly recommended!",
      name: "Erna",
      rating: "5/5",
      star: "★ ★ ★ ★ ★",
    },
    {
      id: 3,
      content:
        "Pertama kali coba kue biji ketapang dari Dapoer Raos dan langsung jatuh cinta! Rasanya enak sekali, tidak terlalu manis, dan gurihnya pas. Bikin ketagihan deh! Pengiriman juga cepat dan kemasannya aman.",
      name: "Citra",
      rating: "5/5",
      star: "★ ★ ★ ★ ★",
    },
    {
      id: 4,
      content:
        "Saya memesan kue biji ketapang untuk acara keluarga, dan semuanya suka! Rasanya sangat lezat dan teksturnya renyah. Satu toples langsung habis dalam sekejap, Kualitas kuenya sangat baik",
      name: "Chitta Purnawati",
      rating: "5/5",
      star: "★ ★ ★ ★ ★",
    },
    {
      id: 5,
      content:
        "Kue biji ketapang dari Dapoer Raos benar-benar enak! Rasanya gurih dan renyah, bikin nggak bisa berhenti ngemil. Harganya juga terjangkau dengan kualitas yang sangat baik. Sangat puas dengan pembelian ini, pasti akan jadi langganan tetap.",
      name: "Erniwati",
      rating: "4/5",
      star: "★ ★ ★ ★ ☆",
    },
  ];

  const settings = {
    slidesToShow: 4,
    speed: 1000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          centerMode: true,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="px-8">
      <p className="text-center text-[#feab3b] font-bold text-2xl lg:text-3xl">
        Testimoni Produk
      </p>
      <div className="mt-8 h-full w-full mb-4">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="max-w-[240px] md:max-w-[240px] xl:max-w-[280px] 2xl:max-w-[310px] h-[310px] xl:h-[340px] font-poppins mb-4 p-8 mx-auto lg:mx-4 rounded-xl bg-[#f3f3f3] shadow-lg"
            >
              <div className="flex justify-center items-center h-[25%]">
                <div className="w-1/4 items-center justify-center my-auto rounded-full">
                  <Avatar
                    src={"/default-avatar.png"}
                    alt="Profile Picture"
                    size={"md"}
                  />
                </div>
                <div className="ml-4 w-3/4">
                  <p className="text-md font-medium">{testimonial.name}</p>
                </div>
              </div>

              <div className="h-[50%]">
                <p className="mt-4 text-gray-700 text-md line-clamp-4 lg:line-clamp-5">
                  {testimonial.content}
                </p>
              </div>

              <div className="flex justify-end lg:justify-start items-center gap-4 h-[25%]">
                <span className="text-black">{testimonial.rating}</span>

                <div className="bottom-0">
                  <p className="text-sm md:text-xl lg:text-2xl text-yellow-500">
                    {testimonial.star}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
