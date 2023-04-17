import React from "react";
import Image from "next/image";
import aboutImg from "../assets/about.webp";
import Engage from "@/components/Engage";
const About = () => {
  return (
    <div className="about_page ">
      <div className="flex items-center justify-center px-16 lg:px-8 mt-20 md:py-10 bg-gradient-to-l from-tertiary to-primary sm:p-4  xs:p-2 landing bg-secondary min-h-[70vh] sm:min-h-[50vh] sm:w-full">
        <div className="flex flex-col items-center  w-[70vw] sm:w-[95%] xs:w-full gap-4 text-center content_about">
          <strong className="mb-3 text-5xl font-bold leading-[3.75rem]  md:text-3xl ">
            About us
          </strong>
          <p className="w-[80%] sm:w-[90%] ">
            Welcome to our company! We are a team of talented professionals
            dedicated to providing top-notch services in web development, app
            development, SEO, digital marketing, and graphic designing.
          </p>
        </div>
      </div>
      <section className="flex gap-10 px-16 bg-gradient-to-r from-gray-100 to-gray-300 py-24 about_content md:flex-col  max-w-[1535px] m-auto sm:text-justify sm:gap-8 lg:px-8 sm:px-4 xlmin:h-fit sm:py-10">
        <div className="flex-1 left_img">
          <Image
            src={aboutImg}
            alt="company logo"
            className="h-full md:h-[500px]"
          />
        </div>
        <div className="flex flex-col flex-1 gap-4 content ">
          <h3 className="text-4xl font-bold sm:text-center md:text-3xl">
            About Ik Solution
          </h3>
          <p>
            Welcome to our company! We are a team of talented professionals
            dedicated to providing top-notch services in web development, app
            development, SEO, digital marketing, and graphic designing.
          </p>
          <p>
            Our passion for technology and creativity drives us to constantly
            innovate and exceed our clients expectations. With years of
            experience in the industry, we have developed a deep understanding
            of the digital landscape and have honed our skills to deliver
            exceptional results.
          </p>
          <p>
            Our web development team is proficient in a range of programming
            languages and frameworks, allowing us to create custom solutions
            tailored to your specific needs. We also offer app development
            services, whether you need an iOS, Android, or cross-platform app.
          </p>
          <p>
            Our SEO experts can help boost your online presence by optimizing
            your website and content for search engines. Our digital marketing
            team can help you reach your target audience through various
            channels, including social media, email marketing, and PPC
            advertising.
          </p>
          <p>
            Last but not least, our graphic designers can help elevate your
            brand by creating visually stunning designs that represent your
            company&apos;s values and mission.
          </p>
          <p>
            At our company, we value communication, transparency, and
            collaboration. We work closely with our clients to ensure that we
            deliver the best possible results and exceed their expectations. We
            pride ourselves on our ability to provide personalized and flexible
            services that cater to each client&apos;s unique needs
          </p>
          <p>
            Thank you for considering us for your digital needs. We look forward
            to working with you!
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-8 px-16 bg-gradient-to-r from-gray-300 to-gray-100 py-24 max-w-[1535px] m-auto text-center bg-gray-200 sm:text-justify why_exist lg:px-8 sm:px-4 sm:py-10">
        <strong className="text-4xl text-center md:text-3xl">
          Our Mission
        </strong>
        <p>
          Our mission is to empower businesses with the latest digital solutions
          and creative designs that help them stand out in a crowded
          marketplace. We believe that technology and creativity go
          hand-in-hand, and that by combining the two, we can create exceptional
          experiences for our clients and their customers. We are committed to
          staying at the forefront of industry trends and continuously improving
          our skills to provide the best possible service to our clients.
        </p>
        <p>
          We understand that every business is unique, and we tailor our
          services to meet each client&apos;s specific needs. Whether
          you&apos;re a startup or an established company, we work with you to
          understand your goals and create a strategy that drives results. Our
          team of talented professionals is passionate about what they do, and
          it shows in the quality of our work. From web development to app
          development, SEO to digital marketing, and graphic designing, we are
          dedicated to delivering exceptional results that exceed our clients
          expectations.
        </p>
        <p>
          We also believe in building strong, long-term relationships with our
          clients. We value transparency, honesty, and open communication, and
          we work closely with our clients to ensure that we are always on the
          same page. At our company, we strive to make a positive impact on the
          world through our work. We believe that by helping businesses succeed,
          we are contributing to a better, more innovative future.
        </p>
        <p>
          Thank you for considering us for your digital needs. We look forward
          to partnering with you to help your business thrive.
        </p>
      </section>
      <Engage />
    </div>
  );
};

export default About;
