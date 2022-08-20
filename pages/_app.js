import "../styles/globals.css";
import { CoffeeStoreProvider } from "../context/coffeeStores-context";

function MyApp({ Component, pageProps }) {
  return (
    <CoffeeStoreProvider>
      <Component {...pageProps} />
    </CoffeeStoreProvider>
  );
}

export default MyApp;
