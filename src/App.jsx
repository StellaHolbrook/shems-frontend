import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Desktop } from "./screens/Desktop";
import { DesktopScreen } from "./screens/DesktopScreen";
import { DivWrapper } from "./screens/DivWrapper";
import { Screen3 } from "./screens/Screen3";
import { Screen4 } from "./screens/Screen4";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Desktop />,
  },
  {
    path: "/desktop-13",
    element: <Desktop />,
  },
  {
    path: "/desktop-15",
    element: <DesktopScreen />,
  },
  {
    path: "/desktop-4",
    element: <DivWrapper />,
  },
  {
    path: "/desktop-14",
    element: <Screen3 />,
  },
  {
    path: "/desktop-1",
    element: <Screen4 />,
  },
  // {
  //   path: "/desktop-12",
  //   element: <Screen4 />,
  // },
  // {
  //   path: "/desktop-8",
  //   element: <Screen4 />,
  // },
]);

// const flask = ()

export const App = () => {
  // here begins by returning the separate router to the desktop screen
  return (
      <>
      <RouterProvider router={router} />
      </>
  );
};
