import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import {Menu} from "./components/Menu/Menu.tsx";
import {App} from "./App.tsx";
import {Registration} from "./components/Registration/Registration.tsx";
import {Record} from "./components/Record/Record.tsx";
import {BoardMaker} from "./components/BoardMaker/BoardMaker.tsx";
import {Rules} from "./components/Rules/Rules.tsx";
import {Authentication} from "./components/Authentication/Authentication.tsx";
import {AppContextProvider} from "./context/AppContext.ts";

export const root =
    ReactDOM.createRoot(document.getElementById('root')!);
export const AppContext =
    React.createContext(null as unknown as AppContextProvider);
const router = createBrowserRouter([
    {
        path: "/",
        element: <Menu/>,
    },
    {
        path: "/game",
        element: <App/>,
    },
    {
        path: "/register",
        element: <Registration/>
    },
    {
        path: "/records",
        element: <Record/>
    },
    {
        path: "/start-game",
        element: <BoardMaker/>
    },
    {
        path: "/rules",
        element: <Rules/>
    },
    {
        path: "/sign-in",
        element: <Authentication/>
    }
]);

root.render(
  <React.StrictMode>
      <AppContext.Provider value={new AppContextProvider()}>
      <RouterProvider router={router}/>
      </AppContext.Provider>
  </React.StrictMode>
)
