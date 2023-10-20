import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../../redux/orebiSlice";

const Type = ({ setSelectedCateg }) => {
    const [showColors, setShowColors] = useState(true);
    const dispatch = useDispatch();
    const category = [
        {
            _id: 9007,
            title: "Cream",
        },
        {
            _id: 9006,
            title: "Powder",
        },
        {
            _id: 9008,
            title: "Pencil",
        },
        {
            _id: 9009,
            title: "Liquid",
        },
        {
            _id: 9010,
            title: "Gel",
        },
        {
            _id: 9011,
            title: "Lipstick",
        },
        {
            _id: 9012,
            title: "Lip gloss",
        },
        {
            _id: 9013,
            title: "Lip stain",
        },
    ];

    const fetchProductsByCat = async (selectedCateg) => {
        setSelectedCateg(selectedCateg);
        try {
            const response = await fetch(
                `http://makeup-api.herokuapp.com/api/v1/products.json?product_category=${selectedCateg}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const jsonData = await response.json();
            console.log(jsonData);
            dispatch(setProducts(jsonData));
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <div onClick={() => setShowColors(!showColors)} className="cursor-pointer">
                <NavTitle title="Shop by Category" icons={true} />
            </div>
            {showColors && (
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
                        {category.map((item) => (
                            <li
                                key={item._id}
                                onClick={() => fetchProductsByCat(item.title.replace(/\s/g, "").toLowerCase())}
                                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer "
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default Type;
