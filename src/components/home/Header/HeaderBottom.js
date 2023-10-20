import React, { useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../redux/orebiSlice";

const HeaderBottom = () => {
    const products = useSelector((state) => state.orebiReducer.products);
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleSearchSubmit = async () => {
        console.log(searchQuery);
        try {
            const response = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${searchQuery}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const jsonData = await response.json();
            console.log(jsonData);
            if (jsonData.length < 1) {
                return alert("no data found!");
            } else {
                dispatch(setProducts(jsonData));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full bg-[#F5F5F3] relative">
            <div className="max-w-container mx-auto">
                <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
                    <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
                        <input
                            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                            type="text"
                            onChange={handleSearch}
                            value={searchQuery}
                            placeholder="Search your favourite brands here!"
                        />
                        <FaSearch onClick={handleSearchSubmit} className="w-5 h-5" />
                    </div>
                    <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
                        <Link to="/cart">
                            <div className="relative">
                                <FaShoppingCart />
                                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                                    {products.length > 0 ? products.length : 0}
                                </span>
                            </div>
                        </Link>
                    </div>
                </Flex>
            </div>
        </div>
    );
};

export default HeaderBottom;
