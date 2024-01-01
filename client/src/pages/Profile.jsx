import React from "react";
import { useParams } from "react-router-dom";

const Profle = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="bg-primary text-ascent-2 min-h-[87vh]">
        <p>Profile :{id}</p>
      </h1>
    </div>
  );
};

export default Profle;
