"use client"; // This directive indicates that this is a client component

import { Provider } from "react-redux";
import { store } from "./index"; // Adjust the import path according to your project structure
import React from "react";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientProvider;
