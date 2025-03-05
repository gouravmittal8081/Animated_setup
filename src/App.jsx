import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const testimonials = [
  {
    name: "Jacob Jones",
    text: "As a budding startup, we sought a financial solution that was simple, secure, and scalable. Swift Revel checked all the boxes, enabling focus on growth.",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
  },
  {
    name: "Theresa",
    text: "Swift Revel empowers me to manage my business finances with confidence and ease. Their integrated tax solutions ensure I'm always tax compliant.",
    image: "https://randomuser.me/api/portraits/women/42.jpg",
  },
  {
    name: "Webb John",
    text: "Swift Revel empowers me to manage my business finances with confidence and ease. Their integrated tax solutions ensure I'm always tax compliant.",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
  },
  {
    name: "Ronald Richards",
    text: "We needed a payment gateway that could handle our diverse customer base. Swift Revel offers a wide range of payment options, making it easy for our clients to pay.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Cody Fisher",
    text: "As a Freelancer, managing invoices and chasing payments was a constant headache. Now, with automated and secure payment I am getting paid on time, every time.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Marvin",
    text: "Since switching to Swift Revel, I finally have peace of mind regarding my business finances. With their secure platform, I trust my data's protection completely.",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "McKinney",
    text: "Since switching to Swift Revel, I finally have peace of mind regarding my business finances. With their secure platform, I trust my data's protection completely.",
    image: "https://randomuser.me/api/portraits/women/51.jpg",
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

const TestimonialCarousel = () => {
  const sliderRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const scroll = () => {
      if (sliderRef.current && !paused) {
        sliderRef.current.scrollLeft += 1;
        if (sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth / 2) {
          sliderRef.current.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="testimonial-container">
      <div>
        <h2 className="testimonial-heading">What Users Say</h2>
        <p className="testimonial-subtext">
          Testimonials that speak louder than words! Customer stories that light up our day.
        </p>
        <div className="testimonial-wrapper" ref={sliderRef}>
          <motion.div className="testimonial-slider">
            {duplicatedTestimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="testimonial-card"
                initial={{ y: i % 2 === 0 ? 40 : -40, opacity: 0.8 }}
                animate={{
                  y: paused ? 0 : [i % 2 === 0 ? 40 : -40, 0, i % 2 === 0 ? -40 : 40],
                }}
                transition={{
                  repeat: paused ? 0 : Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <p className="testimonial-text">{testimonial.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;