import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/store-context";

import { FetchCoffeeShops } from "../../lib/coffee-shop";
import styles from "../../styles/cofee-store.module.css";


export async function getStaticPaths() {
  const coffeeList = await FetchCoffeeShops()
  const paths = coffeeList.map((coffee) => {
    return {
      params: {
        dynamic: coffee.id,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const coffeeList = await FetchCoffeeShops()
  const found = coffeeList.find((coffee) => {
    return coffee.id === params.dynamic;
  })

  return {
    props: {
      cofeeList: found ? found : {}
    },
  };
}


const CoffeeItem = (props) => {

  const router = useRouter()
  const id = router.query.dynamic
  const {dispatch, state} = useContext(StoreContext)
  
  const {coffeeShops} = state

  console.log('checking', coffeeShops)

  const [coffees, setCoffees] = useState(props.cofeeList)

  useEffect(()=>{
    
    if(coffeeShops.length > 0){
      console.log("useffect check ")
      const found = coffeeShops.find((coffee) => {
        console.log("coffee id,", coffee.id , id)
        return coffee.id === id;
      })
      console.log("check found", found)
      setCoffees(found)
    }

  },[coffeeShops])


  if (router.isFallback) {  
    return <div>loading....</div>;
  }


  const { name,  location,  timezone, imgUrl} = coffees;
  const images = imgUrl ? imgUrl : 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
  console.log('check pros', coffees)
  const handleupvote = () => {
    console.log("handle upvote");
  };


  return (
    <>
      <Head>
        <title>{name && name}</title>
      </Head>

      <div className={styles.backToHomeLink}>
        <Link href="/">Back to Home Page</Link>
      </div>

      <div className={`layout ${styles.container}`}>
        <div className={styles.heading}>

          <div className={styles.col1}>
            <h2> {name && name} </h2>
            {images && 
            <Image src={images} width="600" height="300" alt="image"></Image> }
          </div>
        </div>

        <div className={`glass ${styles.col2}`}>
          <div className={styles.iconWrapper}>
            <Image src={images} width="24" height="24" alt="image"></Image>
            <p>{timezone }</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={images} width="24" height="24" alt="image"></Image>
            <p>{location}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleupvote}>
            Upvote
          </button>
        </div>
      </div>
    </>
  );
};

export default CoffeeItem;
