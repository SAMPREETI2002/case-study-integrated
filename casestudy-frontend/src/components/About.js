import React from 'react';
import './styles/About.css'; // Import the CSS file

const About = () => {
    // Sample data for images and descriptions
    

    return (
        <div>
            {/* Navbar component can be added here */}
            <div className="about-container">
                <h1>About Us</h1>
                <p>
                At TELSTAR, we are committed to connecting people and businesses with reliable, innovative, and affordable communication solutions. With a passion for delivering world-class services, we provide cutting-edge technology to power your everyday communications, whether it’s through high-speed internet, seamless mobile networks, or tailored business solutions.

Founded with the goal of making connectivity accessible to everyone, we have grown into a trusted name in the telecom industry, serving millions of customers with integrity, transparency, and exceptional customer service. Our state-of-the-art infrastructure and dedication to constant innovation ensure that you stay connected anytime, anywhere.
                </p>
            </div>
            
            <div className="customer-reviews">
                <h2>What Our Customers Say</h2>
                <div className="review">
                    <p>“Best telecom service I’ve ever used!” - Harshit Rana</p>
                </div>
                <div className="review">
                    <p>“Reliable and fast Internet, highly recommend!” - Radhika Menon</p>
                </div>
            </div>
        </div>
    );
}

export default About;
