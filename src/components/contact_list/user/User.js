import { UsersContext } from "context/Context";
import { useContext } from "react";
import React from 'react'; // Import React is often needed

export default function User({ index }) { // Destructure index directly
  const obj = useContext(UsersContext);

  // Safeguards against undefined obj or index
  if (!obj || !obj.layoutsOrder || !obj.layoutsOrder[index]) {
    console.log("obj or index is invalid:", obj, index); // Helpful debugging
    return <div>Loading or invalid data...</div>; // Important: Return something!
  }

  const layout = obj.layoutsOrder[index]; // Store the layout for easier access

  return (
    <div style={{backgroundColor:'green'}}>
    <h4>{layout.name}</h4>
      <h5> {layout.attach}</h5> {/* Access properties from layout */}
       <h5>{layout.order}</h5>
    </div>
  );
} 