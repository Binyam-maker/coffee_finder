import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import coffeeStores from "../../lib/coffee-store";
import { useGlobalContext } from "../../context/coffeeStores-context";
import { useEffect, useState } from "react";
import { BsFillSuitHeartFill } from "react-icons/bs";
import handleUpVote from "../../lib/handleUpVote";
import useSWR from "swr";
export async function getStaticPaths() {
  const coffeeStoresData = await coffeeStores();
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id,
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const data = await coffeeStores();

  const oneCoffeeStore = data.find(
    (coffeeStore) => coffeeStore.id === params.id
  );

  return {
    props: {
      staticStoreData: oneCoffeeStore ? oneCoffeeStore : {},
    },
  };
}

const CoffeeStore = ({ staticStoreData }) => {
  const router = useRouter();
  const [coffeeStore, setCoffeeStore] = useState(staticStoreData);

  // here

  // data should be gathered after fallback

  const { nearByCoffeeStore } = useGlobalContext();

  const createCoffeeStore = async () => {
    try {
      await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coffeeStore }),
      });
    } catch (error) {}
  };

  // SWR for getting latest coffee store data
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    `/api/getCoffeeStoreById?id=${router.query.id}`,
    fetcher
  );
  // Update the UI with the data
  useEffect(() => {
    if (data && data.coffeeStore) setCoffeeStore(data.coffeeStore);
  }, [data]);

  useEffect(() => {
    // if no static data, get coffee store data from context in the client side
    if (Object.keys(staticStoreData).length === 0) {
      if (nearByCoffeeStore) {
        const dynamicStoreData = nearByCoffeeStore.find(
          (coffeeStore) => coffeeStore.id === router.query.id
        );
        setCoffeeStore(dynamicStoreData);
      }
    }
  }, [router.query.id]);

  // Post the store on the database : /api/createCoffeeStore
  createCoffeeStore();

  // fallback for the  first time
  if (router.isFallback) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
  const { name, address, imgUrl, neighborhood, likes } = coffeeStore;
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center bg-fixed"
      style={{ backgroundImage: 'url("/bg-mesh.jpg")' }}
    >
      <Head>
        <title>{name}</title>
      </Head>

      <Link href="/">
        <a className="mt-12"> Back to home</a>
      </Link>

      <h1 className="container mt-16 text-2xl text-yellow-900 mx-auto px-8 text-center">
        {name}
      </h1>
      <div className="flex flex-col gap-4 items-center  container  my-4 mx-auto  sm:flex-row justify-center p-4 ">
        <Image
          src={imgUrl}
          width="600"
          height="360"
          className="rounded-md object-cover"
          alt="Coffee Store"
        />

        <div className="grid  w-4/5 gap-4 bg-white bg-opacity-40 border p-3 mx-8 rounded-xl hover:cursor-pointer hover:bg-opacity-60 h-fit min-w-fit text-primary sm:w-2/5 text-center max-w-md">
          <p>{address}</p>
          <p>{neighborhood}</p>
          <div className="flex items-center  mx-auto gap-2">
            <span className="text-pink-500 mt-2">
              <BsFillSuitHeartFill />
            </span>
            <p className="text-2xl bold">{likes}</p>
          </div>
          <button
            onClick={() =>
              handleUpVote({ id: router.query.id }, setCoffeeStore, coffeeStore)
            }
            className="block bg-primary text-white py-3 px-1 w-64 mx-auto"
          >
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
