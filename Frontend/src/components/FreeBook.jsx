import React from 'react'
import list from '../../public/list.json'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from './Card';
function FreeBook() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const filterData = list.filter((data) => data.category === "Free")

  return (
    <>

      <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>

        <div>
          <h1 className='font-semibold text-xl pb-2' >Free Offered Courses</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea veniam corrupti optio illum officiis in, unde perspiciatis minima quam! Nesciunt iste enim et exercitationem ipsam omnis tempora voluptatibus eaque accusantium.</p>
         
        </div>

        <div >
          <Slider {...settings}>
          {filterData.map((data) => (
              <Card item={data} key={data.id}/>
          ))}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default FreeBook
