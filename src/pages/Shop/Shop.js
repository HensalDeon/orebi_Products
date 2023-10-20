import React, { useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/orebiSlice";
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
const Shop = () => {
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCateg, setSelectedCateg] = useState("");
    const itemsPerPage = 20;

    const override = {
        display: "block",
        margin: "15% auto",
    };

    const fetchProducts = async () => {
        const response = await fetch(
            "http://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4&rating_less_than=6"
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    };

    const dispatch = useDispatch();

    const { data, error, isLoading } = useQuery("products", fetchProducts);

    useEffect(() => {
        if (data) {
            dispatch(setProducts(data));
        }
    }, [data, dispatch]);

    return (
        <>
            {isLoading ? (
                <HashLoader cssOverride={override} color="#d6ab36" />
            ) : (
                <div className="max-w-container mx-auto px-4">
                    <Breadcrumbs title="Products" />
                    <div className="w-full h-full flex pb-20 gap-10">
                        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
                            <ShopSideNav setSelectedBrand={setSelectedBrand} setSelectedCateg={setSelectedCateg} />
                        </div>
                        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
                            <ProductBanner selectedBrand={selectedBrand}/>
                            <Pagination itemsPerPage={itemsPerPage} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Shop;
