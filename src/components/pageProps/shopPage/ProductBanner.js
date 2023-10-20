import React, { useEffect, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { setProducts } from "../../../redux/orebiSlice";
import { useDispatch } from "react-redux";

const ProductBanner = ({ selectedBrand}) => {
    const [selectedType, setSelectedType] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${selectedBrand}&product_type=${selectedType}&price_greater_than=${selectedPrice.priceOne}`
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                dispatch(setProducts(data));
                console.log("dispatched");
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [selectedType, selectedPrice]);
    const items = [
        {
            _id: 9001,
            title: "Blush",
        },
        {
            _id: 9002,
            title: "Bronzer",
        },
        {
            _id: 9003,
            title: "Eyebrow",
        },
        {
            _id: 9004,
            title: "Eyeliner",
        },
        {
            _id: 9005,
            title: "Eyeshadow",
        },
        {
            _id: 9006,
            title: "Foundation",
        },
        {
            _id: 9007,
            title: "Lipliner",
        },
        {
            _id: 9008,
            title: "Lipstick",
        },
        {
            _id: 9009,
            title: "Mascara",
        },
        {
            _id: 9010,
            title: "Nailpolish",
        },
    ];
    const priceList = [
        {
            _id: 950,
            priceOne: 0.0,
            priceTwo: 10.99,
        },
        {
            _id: 951,
            priceOne: 11.0,
            priceTwo: 19.99,
        },
        {
            _id: 952,
            priceOne: 20.0,
            priceTwo: 29.99,
        },
        {
            _id: 953,
            priceOne: 30.0,
            priceTwo: 39.99,
        },
        {
            _id: 954,
            priceOne: 40.0,
            priceTwo: 49.99,
        },
        {
            _id: 955,
            priceOne: 50.0,
            priceTwo: 100.0,
        },
    ];

    return (
        <div className="w-full flex flex-row md:flex-row md:items-center gap-3">
            <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
                <div className="flex items-center gap-2 text-base text-[#767676] relative">
                    <label className="block">Type:</label>
                    <select
                        onChange={(e) => setSelectedType(e.target.value)}
                        id="countries"
                        className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
                    >
                        {items.map((item) => (
                            <option key={item._id}>{item.title}</option>
                        ))}
                    </select>
                    <span className="absolute text-sm right-2 md:right-4 top-2.5">
                        <GoTriangleDown />
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
                <div className="flex items-center gap-2 text-base text-[#767676] relative">
                    <label className="block">Filter by:</label>
                    <select
                        onChange={(e) => {
                            const priceOne = e.target.selectedOptions[0].getAttribute("data-priceone");
                            const priceTwo = e.target.selectedOptions[0].getAttribute("data-pricetwo");
                            setSelectedPrice({ priceOne: priceOne, priceTwo: priceTwo });
                        }}
                        id="countries"
                        className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
                    >
                        {priceList.map((item) => (
                            <option key={item._id} data-priceone={item.priceOne} data-pricetwo={item.priceTwo}>
                                ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
                            </option>
                        ))}
                    </select>
                    <span className="absolute text-sm right-2 md:right-4 top-2.5">
                        <GoTriangleDown />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductBanner;
