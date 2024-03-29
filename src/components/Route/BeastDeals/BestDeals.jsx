import React, { useState, useEffect } from "react";
import { productData } from "../../../static/data.jsx";
import styles from "../../../styles/style.jsx";
import ProductCard from "../../Product/ProductCard/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions/product.js";

const BestDeals = ({ data }) => {
  // const [data, setData] = useState([]);
  // const dispatch = useDispatch();
  // const { allProducts } = useSelector((state) => state.product);
  // useEffect(() => {
  //   dispatch(getAllProducts());
  //   const allProductsData = allProducts ? [...allProducts] : [];
  //   const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
  //   const firstFive = sortedData && sortedData.slice(0, 5);
  //   setData(firstFive);
  // }, [dispatch]);
  // console.log(allProducts);

  // useEffect(() => {
  //   dispatch(getAllProducts());
  //   const firstFive = allProducts && allProducts.slice(0, 5);
  //   setData(firstFive);
  // }, []);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {/* {data && data.map((i, index) => <ProductCard data={i} key={index} />)} */}
          {data && data.length !== 0 && (
            <>
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
