import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { testimonials } from "../assets/assets";

const TestimonialSlider = () => {
  return (
    <div className="bg-gray-800 text-white px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-1 teko-regular">
        What our customers say
      </h1>
      <p className="text-2xl text-gray-300 teko-regular">
        Read the testimonials of our customers.
      </p>
      <div className=" mx-auto p-6 relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          loop={true}
          navigation={{ nextEl: ".next-button", prevEl: ".prev-button" }}
        >
          {testimonials.map((testimonial, i) => (
            <SwiperSlide key={i}>
              <div className="bg-slate-700 p-4 rounded text-center shadow-md text-white h-full min-h-[250px] border border-gray-400">
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-200">{testimonial.business}</p>
                <p className="text-gray-300 italic mt-5">
                  "{testimonial.testimonial}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="prev-button absolute border border-gray-400 left-0 md:left-[-35px] top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 z-10 cursor-pointer">
          <FaArrowLeft size={20} />
        </button>
        <button className="next-button absolute  right-0 md:right-[-35px] top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 z-10 cursor-pointer">
          <FaArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
