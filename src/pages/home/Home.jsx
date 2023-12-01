import React from "react";
import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Map from "../../components/map/Map";

const Home = () => {
  return (
    <div>
      <Navbar />
      
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitlea mt-5">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitlea">Homes guests love</h1>
        <FeaturedProperties />
        <div style={{ width: "62%", borderRadius: "20px" }}>
          <Map />
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
