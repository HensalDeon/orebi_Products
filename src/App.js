import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    createRoutesFromElements,
    Route,
    ScrollRestoration,
} from "react-router-dom";

import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";

import Cart from "./pages/Cart/Cart";
import Shop from "./pages/Shop/Shop";

const Layout = () => {
    return (
        <div>
            <HeaderBottom />
            <SpecialCase />
            <ScrollRestoration />
            <Outlet />
        </div>
    );
};
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout />}>
                <Route index element={<Shop />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
            </Route>
        </Route>
    )
);

function App() {
    return (
        <div className="font-bodyFont">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
