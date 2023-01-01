import React from "react";
import { createRoot } from "react-dom/client";
import "./options.css";
const test = <img src='icon.png' />;

const rootConatiner = document.createElement("div");
document.body.appendChild(rootConatiner);
const root = createRoot(rootConatiner);
root.render(test);
