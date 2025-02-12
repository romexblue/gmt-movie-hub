import React from "react";
import Image from "next/image";
import Link from "next/link";
import ErrorImg from "~/assets/error-image.png";

const Error = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="relative">
        <Image src={ErrorImg} height="100" width="100" alt="Error Image" />
      </div>
      <p>
        Sorry, something went wrong. Please{" "}
        <Link href="/" className="underline">
          reload the page
        </Link>
      </p>
    </div>
  );
};

export default Error;
