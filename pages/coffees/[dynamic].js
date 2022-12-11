import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

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
  return {
    props: {
      cofeeList: coffeeList.find((coffee) => {
        return coffee.id === params.dynamic;
      }),
    },
  };
}


const CoffeeItem = (props) => {

  const router = useRouter();

  if (router.isFallback) {
    return <div>loading....</div>;
  }

  const { name, timezone, distance , imgUrl} = props.cofeeList;
  console.log('check pros', props.coffeeList)
  const handleupvote = () => {
    console.log("handle upvote");
  };


  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <div className={styles.backToHomeLink}>
        <Link href="/">Back to Home Page</Link>
      </div>

      <div className={`layout ${styles.container}`}>
        <div className={styles.heading}>

          <div className={styles.col1}>
            <h2> {name} </h2>
            {imgUrl && 
            <Image src={imgUrl} width="600" height="300"></Image> }
          </div>
        </div>

        <div className={`glass ${styles.col2}`}>
          <div className={styles.iconWrapper}>
            <Image src={imgUrl} width="24" height="24"></Image>
            <p>{timezone}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={imgUrl} width="24" height="24"></Image>
            <p>{distance}</p>
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
