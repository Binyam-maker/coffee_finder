import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import heroImage from "..//public/36779986-hero-image.png";
import getCoffeeStores from "../lib/coffee-store";
import { useContext, useEffect, useRef, useState } from "react";

import CoffeeShopsContainer from "../components/coffee_shops_container";

import { useGlobalContext } from "../context/coffeeStores-context";

export async function getStaticProps() {
  const coffeeStoresData = await getCoffeeStores();

  return {
    props: {
      coffeeStores: coffeeStoresData,
    },
  };
}

export default function Home({ coffeeStores }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    latLong,
    nearByCoffeeStore,
    getCurrentPosition,
    getNearbyStoresData,
  } = useGlobalContext();

  // Near by coffee store processed data

  // get stores nearby after
  const getNearByCoffeeStores = () => {
    getCurrentPosition();
  };

  // useRef to block block fetching first render

  useEffect(() => {
    latLong && getNearbyStoresData(latLong);
  }, [latLong]);

  return (
    <div
      className=" flex flex-col items-center justify-center  min-h-screen bg-cover bg-center  "
      style={{
        backgroundImage: 'url("/bg-mesh.jpg")',
        backgroundAttachment: "fixed",
      }}
    >
      <Head>
        <title>Find Coffee</title>
        <meta name="description" content="Find a coffee house" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative container ">
        {/* Hero */}
        <div className="relative ">
          {/* Background Image */}
          <div className=" container text-center ">
            <Image src={heroImage} alt="Hero Image" />
          </div>
          {/* Banner */}
          <Banner
            text={loading ? "Loading..." : "View Stores Nearby!"}
            getNearByCoffeeStores={getNearByCoffeeStores}
          />
        </div>
        {error && (
          <div className="text-red-600 text-center mb-10">
            `Something went wrong: ${error}`
          </div>
        )}
        {nearByCoffeeStore && (
          <CoffeeShopsContainer
            title={"Nearby coffee stores"}
            coffeeStores={nearByCoffeeStore}
          />
        )}
        <CoffeeShopsContainer title={"Toronto"} coffeeStores={coffeeStores} />
      </main>
    </div>
  );
}
