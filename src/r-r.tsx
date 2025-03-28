import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
 
const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary() {
    //Add your error boundary here
    return <div>Something went wrong</div>;
  },
}); 
export const { bootstrap, mount, unmount } = lifecycles;
