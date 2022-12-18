import Store from "../store/store-context";
import "../styles/globals.css";



function MyApp({ Component, pageProps }) {

  return (
    <>
    <Store>
      <Component {...pageProps} />
    </Store>

    </>
  );
}

export default MyApp;
