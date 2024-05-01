"use client";

import { Heading, Text } from "@chakra-ui/react";
import React from "react";

const CardLocation = () => {
  return (
    <div className="mx-10 grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center mb-4">
      <div className="flex flex-col justify-around">
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "#feab3b",
              zIndex: -1,
            }}
          >
            Dapoer Raos by
          </Text>
          <br />
          <Text as={"span"} color={"#feab3b"}>
            Dewi Ratnasari
          </Text>
        </Heading>
        <div className="flex flex-col gap-2 mt-6">
          <Text align={"justify"}>
            <span className="font-semibold">Alamat:</span> di Jl. Griya Pamulang
            2 Blok C1 No.29 RT.02/RW.20, Pondok Benda, Kecamatan Pamulang, Kota
            Tangerang Selatan, Banten 15416.
          </Text>
          <Text>
            <span className="font-semibold">Hubungi:</span>{" "}
            <span
              className="cursor-pointer text-[#feab3b] hover:text-[#febb3b] hover:underline transition-all"
              onClick={() => window.open("http://wa.me/6281320909411?text=")}
            >
              0813 2090 9411
            </span>
          </Text>
          <Text>
            <span className="font-semibold">Jam Operasional: </span>
            07.00 - 21.00 WIB
          </Text>
        </div>
      </div>
      <div>
        <iframe
          className="rounded-xl shadow-lg md:w-[500px] md:h-[400px] w-[350px] h-[300px]"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d495.685366149467!2d106.7070857!3d-6.3314215!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e5f4d6a60109%3A0xed9fc9a3416bfaf!2sKuliner%20Dapoer%20Raos!5e0!3m2!1sid!2sid!4v1713694637433!5m2!1sid!2sid"
          width="500"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default CardLocation;
