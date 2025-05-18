import { useState } from "react";
import MainHero from "../components/MainHero";
import TestimonialSlider from "../components/Testimonials";
import Footer from "../components/Footer";
import GetStarted from "../components/GetStarted";
import Contact from "../components/Contact";
import KeyFeatures from "../components/KeyFeatures";
import BusinessBenefits from "../components/BusinessBenefits";

const Hero = () => {
  const [support, setSupport] = useState(false);

  return (
    <div>
      <MainHero />
      <KeyFeatures />
      <BusinessBenefits />
      <TestimonialSlider />
      <GetStarted />
      <Contact />
      <Footer />
      {/* <div className="absolute bottom-5 right-5 flex items-center gap-2 z-10">
        <div
          className="text-white p-2 bg-gray-500 cursor-pointer"
          title={support ? "Close" : "Customer Support"}
          onClick={() => setSupport(!support)}
        >
          {support ? <IoCloseSharp size={25} /> : <MdSupportAgent size={30} />}
        </div>
        <div className={`${support ? "block" : "hidden"} bg-gray-500 p-2 `}>
          <div className="flex items-center gap-1 text-sm">
            <IoMdCall className="text-white " /> +977 9801234567
          </div>
          <div className="flex items-center gap-1 text-sm">
            <MdEmail className="text-white" /> info@bizbro.com
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
