import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-800 text-white px-6 md:px-16 lg:px-24 py-16 md:py-24 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold teko-regular">
          Get In Touch
        </h1>
        <p className="text-xl text-gray-300 teko-regular">
          Have questions about BizBro or need assistance? Our team is here to help.
        </p>
      </div>

      <div className="bg-slate-800 p-5 border border-gray-400 rounded shadow-2xl w-full">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Information Side */}
          <div className="p-4">
            <h2 className="text-xl boldonse-regular mb-4">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-3 mt-1 text-blue-400">
                  <FaMapMarkerAlt size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">Office Address</h3>
                  <p className="text-gray-300 text-sm">44207, Narayangadh</p>
                  <p className="text-gray-300 text-sm">Bharatpur, Chitwan</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 mt-1 text-blue-400">
                  <FaPhone size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-300 text-sm">+977 9845012367</p>
                  <p className="text-gray-300 text-sm">Sun-Fri: 10AM - 5PM</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 mt-1 text-blue-400">
                  <FaEnvelope size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-300 text-sm">support@bizbro.com</p>
                  <p className="text-gray-300 text-sm">info@bizbro.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 mt-1 text-blue-400">
                  <FaClock size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">Office Hours</h3>
                  <p className="text-gray-300 text-sm">
                    Sunday to Friday: 10AM - 5PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="p-4 md:border-l border-gray-600">
            <h2 className="text-xl boldonse-regular mb-4">Send Us a Message</h2>

            <form className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-gray-700 border border-gray-600 rounded py-1.5 px-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-gray-700 border border-gray-600 rounded py-1.5 px-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-gray-700 border border-gray-600 rounded py-1.5 px-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded py-1.5 px-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
