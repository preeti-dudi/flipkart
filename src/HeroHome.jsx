import React from "react";
import ImageCarousel from "./Carousel";
import JeweleryProducts from "./jevelery";
import Electronics from "./electronics";
import ElectronicProducts from "./Topelements";
import Footer from "./Footer";
import Disclaimer from "./desc";
import Trending from "./trending";



const HeroHome = () => {

    return(
        <div className=" px-10">
            <ImageCarousel />
            <JeweleryProducts />
            <Electronics />
            <ElectronicProducts />
            
            <Trending />
            <Disclaimer />
            <Footer />
        </div>

    )

}

export default HeroHome;