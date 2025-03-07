// Import necessary hooks from React and animation library from Framer Motion
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./App.css"; // Import external CSS for styling

// Define an array of testimonial objects with name, text, and image properties
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

// Duplicate testimonials array to create a seamless infinite scrolling effect
const duplicatedTestimonials = [...testimonials, ...testimonials];

// Define the TestimonialCarousel component
const TestimonialCarousel = () => {
  const sliderRef = useRef(null); // Create a reference for the testimonial slider container
  const [paused, setPaused] = useState(false); // State to manage whether the scrolling animation is paused

  // useEffect hook to handle automatic scrolling of the testimonials
  useEffect(() => {
    const scroll = () => {
      if (sliderRef.current && !paused) { // Check if the slider exists and scrolling is not paused
        sliderRef.current.scrollLeft += 1; // Increment scroll position to create scrolling effect
        if (sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth / 2) {
          sliderRef.current.scrollLeft = 0; // Reset scroll position to create an infinite loop effect
        }
      }
    };

    const interval = setInterval(scroll, 20); // Set an interval to run the scroll function every 20ms
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [paused]); // Dependency array ensures effect runs when 'paused' state changes

  return (
    <div className="testimonial-container"> {/* Main container for testimonials */}
      <div>
        <h2 className="testimonial-heading">What Users Say</h2> {/* Section title */}
        <p className="testimonial-subtext"> {/* Subtitle for the testimonials section */}
          Testimonials that speak louder than words! Customer stories that light up our day.
        </p>
        <div className="testimonial-wrapper" ref={sliderRef}> {/* Wrapper div for scrolling effect */}
          <motion.div className="testimonial-slider"> {/* Animated wrapper for testimonials */}
            {duplicatedTestimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="testimonial-card"
                initial={{ y: i % 2 === 0 ? 40 : -40, opacity: 0.8 }} // Initial animation position
                animate={{
                  y: paused ? 0 : [i % 2 === 0 ? 40 : -40, 0, i % 2 === 0 ? -40 : 40], // Create vertical bounce effect
                }}
                transition={{
                  repeat: paused ? 0 : Infinity, // Infinite loop when not paused
                  duration: 4, // Animation duration
                  ease: "easeInOut", // Smooth animation easing
                }}
                onMouseEnter={() => setPaused(true)} // Pause scrolling when hovered
                onMouseLeave={() => setPaused(false)} // Resume scrolling when mouse leaves
              >
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" /> {/* Testimonial image */}
                <h3 className="testimonial-name">{testimonial.name}</h3> {/* Testimonial author name */}
                <p className="testimonial-text">{testimonial.text}</p> {/* Testimonial content */}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel; // Export the component for use in other parts of the application