import Head from "next/head";
import Banner from "../components/banner/banner";
import Card from "../components/banner/card/card";
import styles from "../styles/Home.module.css";
import { FetchCoffeeShops } from "../lib/coffee-shop";
import useTrackLocation from '../hooks/use-track-location'
import { useContext, useEffect, useState } from "react";
import { Actions, StoreContext } from "./../store/store-context";


export async function getStaticProps(context) {
  const coffeeList = await FetchCoffeeShops();
  return {
    props: { coffeeList },
  };
}


export default function Home() {

  const {dispatch, state} = useContext(StoreContext)
  const {coffeeShops , latlong} = state
  const { errorMsg, handleLocation, isLoading} = useTrackLocation()


  const handleButtonClick = ()=>{
    handleLocation()
  }

  useEffect(()=>{ 


    const getUpdatedLocation = async ()=>{
      const check = await fetch('/api/createCoffeeStore')
      console.log("in the home page", check)
      const res = await fetch(`/api/getCoffeeStores?latlong=${latlong}`)
      const resp = await res.json()
      dispatch({
        type: Actions.SET_Coffee, 
        payload: {
          coffeeShops: resp
        }
      })
    }
    console.log('loading effect')
    getUpdatedLocation()

  },[latlong ,errorMsg])


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Qasim Khana Coffee-Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner text={isLoading ? 'Loading ....' :  'Find Nearby Shops'} handleClick={handleButtonClick} />
        <div className={styles.cardLayout}>
          {coffeeShops && coffeeShops.map((coffee) => {
            return (
              <Card
                key={coffee.id}
                href={`coffees/${coffee.id}`}
                src={
                  coffee.imgUrl ||
                  "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
                }
                name={coffee.name}
                className={styles.card}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
