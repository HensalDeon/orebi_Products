import React from "react";
import Brand from "./shopBy/Brand";
import Type from "./shopBy/Type";

const ShopSideNav = ({ setSelectedBrand,setSelectedCateg }) => {
    return (
        <div className="w-full flex flex-col gap-6">
            <Brand setSelectedBrand={setSelectedBrand} />
            <Type setSelectedCateg={setSelectedCateg} />
        </div>
    );
};

export default ShopSideNav;
