import React from "react";
import { createRoot } from "react-dom/client";

const test = <p>Hello World</p>;

const rootConatiner = document.createElement("div");
document.body.appendChild(rootConatiner);
const root = createRoot(rootConatiner);
root.render(test);
