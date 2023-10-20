import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import Image from "../../designLayouts/Image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const Product = (props) => {
    const dispatch = useDispatch();
    return (
        <div className="w-full relative group border-[1px]">
            <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
                <div>
                    <Image className="w-full h-full" imgSrc={props.img} />
                </div>
                <div className="absolute top-6 left-8"></div>
                <div className="w-full h-20 absolute bg-gray-50 -bottom-[130px] group-hover:bottom-0 duration-700">
                    <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2">
                        <li
                            onClick={() =>
                                dispatch(
                                    addToCart({
                                        _id: props._id,
                                        name: props.productName,
                                        quantity: 1,
                                        image: props.img,
                                        price: props.price,
                                        description: props.description,
                                        brand: props.brand,
                                    })
                                )
                            }
                            className="text-[#767676] hover:text-primeColor text-sm font-normal  hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                        >
                            Add to Cart
                            <span>
                                <FaShoppingCart />
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-80 py-6 flex flex-col gap-1 border-t-0 px-4">
                <div className="flex items-center justify-between font-titleFont">
                    <h2 className="text-lg text-primeColor font-bold">{props.productName}</h2>
                    <p className="text-[#767676] text-[14px]">${props.price}</p>
                </div>
                <div >
                    <p className="text-[#bf6b6b] text-[14px]">{props.brand}</p>
                </div>
            </div>
        </div>
    );
};

export default Product;
