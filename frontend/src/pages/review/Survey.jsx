import React, { useState } from "react";
import "./Survey.css";
import LandingPageNavBar from "../../components/navbars/LandingPageNavBar";
import Footer from "../../components/footer/Footer";

const Survey = () => {
  const [formData, setFormData] = useState({
    option: "",
    rating: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <LandingPageNavBar />
      <div className="survey-container">
        <h1>Survey</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="option">Select an option:</label>
            <select
              id="option"
              name="option"
              onChange={handleChange}
              value={formData.option}
            >
              <option value="">Choose option</option>
              <option value="restaurant">Restaurant</option>
              <option value="courier">Courier</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="feedback">
              Add restaurant name or courier name:
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows="1"
              cols="50"
              onChange={handleChange}
              value={formData.feedback}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rate your experience (1-5):</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              onChange={handleChange}
              value={formData.rating}
            />
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              id="feedback"
              name="feedback"
              rows="4"
              cols="50"
              onChange={handleChange}
              value={formData.feedback}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Survey;
