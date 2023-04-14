import React from "react";
import { Link } from "react-router-dom";
import './cards.css';
import Dot from "../Dot";

const ProfileCard = ({ sections }) => {
  return (
    <div className="profile-card-container">
      {sections.map((section, i) => {
        return (
          <div className="profile-card" key={i}>
            <div className="profile-card-half-dot">
              <Dot color={section.color} size='170' />
            </div>
            <div className= "section-link">
              <Link to={section.url}>{section.title}</Link>
            </div>
          </div>
        )
      })
      }
    </div>
  );
}

export default ProfileCard;