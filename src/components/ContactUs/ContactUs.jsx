import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { contactUsAction } from "../../action/contactUsAction";
import { toast } from "react-toastify";
import toastify from "../../toastify/toastify";

export default function ContactUs() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleContactUs = (e) => {
    e.preventDefault();
    try {
      dispatch(contactUsAction(user.email, message));
      toast.success(
        "Your message has been submitted. We'll contact you as soon as possible.",
        toastify
      );
      setMessage("");
    } catch (error) {
      toast.error(error.message, toastify);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Contact Us</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleContactUs}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={user.email}
                disabled
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}