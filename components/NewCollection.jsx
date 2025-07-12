"use client";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosPrivate from "@/lib/axiosPrivate";

// const newItems = [
//   {
//     title: "Embroidered Overshadow T-Shirt",
//     price: "$99",
//     image: "/assets/collection-1.png",
//   },
//   {
//     title: "Basic Slim Fit T-Shirt",
//     price: "$100",
//     image: "/assets/collection-2.png",
//   },
//   {
//     title: "Blurred T-Shirt",
//     price: "$90",
//     image: "/assets/collection-3.png",
//   },
//   {
//     title: "Blurred T-Shirt",
//     price: "$90",
//     image: "/assets/collection-3.png",
//   },
// ];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const NewCollection = () => {
  const [newItems, setNewItems] = React.useState([]);

  const getData = async () => {
    const res = await axiosPrivate("/items");
    console.log(res);
    setNewItems(res.data);
  };
  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="px-6 lg:px-20 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold uppercase">
          NEW THIS WEEK <span className="text-blue-500">(50)</span>
        </h2>
        <a href="#" className="text-sm text-gray-500 hover:underline">
          See All
        </a>
      </div>

      <Slider {...settings}>
        {newItems.map((item, index) => (
          <div key={index} className="px-2">
            <div className=" p-4  rounded">
              <img alt={item.title} className="w-full"  src={item.images[0]} />
              <div className="mt-3">
                <p className="text-sm text-gray-500">Virtual T Shirt</p>
                <h3 className="font-medium">{item.title}</h3>
                <div className="flex justify-between items-center mt-1">
                  {/* <span className="text-sm font-semibold">{item.price}</span> */}
                  <button className="border px-2 text-lg">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewCollection;
