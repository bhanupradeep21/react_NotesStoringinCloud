import React from 'react';

const ContactUs = () => {
    return (
        <>
        <div className="contact-us-container">
            <h2>Contact Us</h2>
            <div className="contact-details">
                <div className="detail">
                    <strong>Address:</strong>
                    <p>123 React Street, WebCity, JS 10001</p>
                </div>
                <div className="detail">
                    <strong>Phone:</strong>
                    <p>+1 (123) 456-7890</p>
                </div>
                <div className="detail">
                    <strong>Email:</strong>
                    <p>info@reactapp.com</p>
                </div>
                <div className="detail">
                    <strong>Working Hours:</strong>
                    <p>Mon-Fri, 9:00 AM - 5:00 PM</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default ContactUs;
