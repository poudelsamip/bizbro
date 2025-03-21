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
        Hear from business owners
      </h1>

      <div className="mx-auto relative mt-4">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
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
              <div className="bg-slate-700 p-4 rounded shadow-md text-white h-full md:min-h-[280px] border border-gray-400">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <img
                    src={testimonial.image}
                    className="h-[60px] w-[60px] object-cover rounded-full border border-gray-400"
                  />

                  <div>
                    <h3 className="text-lg font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {testimonial.business}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "{testimonial.testimonial}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-around mt-1 md:mt-4">
          <div className="flex gap-2">
            <button className="prev-button  border border-gray-400  bg-gray-700 p-3 rounded hover:bg-gray-600 z-10 cursor-pointer">
              <FaArrowLeft size={20} />
            </button>
            <button className="next-button  border border-gray-400  bg-gray-700 p-3 rounded hover:bg-gray-600 z-10 cursor-pointer">
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* for grid layout without using swiper */}

      {/* <div className="grid md:grid-cols-4 gap-4 mt-4">
        {testimonials.map((testimonial, i) => (
          <div key={i}>
            <div className="bg-slate-700 p-4 rounded shadow-md text-white h-full md:min-h-[280px] border border-gray-400">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img
                  src={testimonial.image}
                  className="h-[60px] w-[60px] object-cover rounded-full border border-gray-400"
                />

                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-200">
                    {testimonial.business}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "{testimonial.testimonial}"
              </p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default TestimonialSlider;
