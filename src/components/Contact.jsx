import Navbar from "./Navbar";

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-50 text-black py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Get in Touch</h1>
          <p className="mt-4 text-lg">
            We’d love to hear from you! Contact us for inquiries, support, or
            feedback.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto mt-10 p-6 grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Send Us a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your Message"
                className="w-full border border-gray-300 p-2 rounded"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary-dark"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Contact Information
          </h2>
          <p className="text-gray-600 mb-6">
            Reach out to us using the details below or visit our location.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <i className="ri-phone-line text-primary text-2xl mr-3"></i>
              <p className="text-gray-700">+234 7031 038 093</p>
            </div>
            <div className="flex items-center">
              <i className="ri-mail-line text-primary text-2xl mr-3"></i>
              <p className="text-gray-700">shotechenterprises@gmail.com</p>
            </div>
            <div className="flex items-center">
              <i className="ri-map-pin-line text-primary text-2xl mr-3"></i>
              <p className="text-gray-700">
                Abeokuta South, Ogun State, Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="container mx-auto mt-10 p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Our Location
        </h2>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Google Maps Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.899558344585!2d3.3514868755148477!3d7.144405416126153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103a4b126fd03c4d%3A0xece6ff3836d51e3c!2sAbeokuta%20South%20Local%20Government%20Secretariat!5e0!3m2!1sen!2sng!4v1691002111849!5m2!1sen!2sng"
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
