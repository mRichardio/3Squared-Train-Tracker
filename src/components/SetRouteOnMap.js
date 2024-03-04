import React from "react";
import { Polyline } from "react-leaflet";

const newColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

const SetRouteOnMap = (route) => {
  const lineOptions = {
    color: newColor(),
    outline: "black",
    outlineWidth: "2px",
    outlineStyle: "solid",
  };

  // variable to store the route
  let myRoute = [];

  // loop through the route and add the coordinates to the myRoute array
  for (let i = 0; i < route.length; i++) {
    myRoute.push([
      route[i].maneuver.location[1],
      route[i].maneuver.location[0],
    ]);
  }

  return <Polyline pathOptions={lineOptions} positions={myRoute} />;
};

export default SetRouteOnMap;
