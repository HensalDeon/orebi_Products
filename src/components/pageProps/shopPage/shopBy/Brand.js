import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../../redux/orebiSlice";
const Brand = ({ setSelectedBrand }) => {
    const [showBrands, setShowBrands] = useState(true);
    const dispatch = useDispatch();
    const fetchProductsByBrand = async (selectedBrand) => {
        setSelectedBrand(selectedBrand);
        try {
            const response = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${selectedBrand}`);
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

    const brands = [
        {
            _id: 990,
            title: "Maybelline",
        },
        {
            _id: 991,
            title: "Almay",
        },
        {
            _id: 992,
            title: "smashbox",
        },
        {
            _id: 993,
            title: "nyx",
        },
        {
            _id: 994,
            title: "Covergirl",
        },
        {
            _id: 995,
            title: "l'oreal",
        },
        {
            _id: 996,
            title: "dior",
        },
    ];

    return (
        <div>
            <div onClick={() => setShowBrands(!showBrands)} className="cursor-pointer">
                <NavTitle title="Famous Brands" icons={true} />
            </div>
            {showBrands && (
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
                        {brands.map((item) => (
                            <li
                                key={item._id}
                                onClick={() => fetchProductsByBrand(item.title.replace(/\s/g, "").toLowerCase())}
                                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer"
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

export default Brand;
