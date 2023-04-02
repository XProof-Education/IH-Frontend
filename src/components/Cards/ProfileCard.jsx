import React from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ sections }) => {
  return (
    <div>
      {sections.map((section, i) => {
        return (
          <div key={i}>
            <Link to={section.url}>{section.title}</Link>
          </div>
        )
      })
      }
    </div>
  );
}

export default ProfileCard;