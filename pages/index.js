import Head from 'next/head'
import Banner from '../components/banner/banner'
import Card from '../components/banner/card/card'
import styles from '../styles/Home.module.css'

import coofeelistData from '../data/coffee-stores.json'


export async function getStaticProps(context){
  return{
    props:{coffeeList: coofeelistData}
  }
}


export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Qasim Khana Coffee-Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <Banner text='Nearby Shops'/>
          <div className={styles.cardLayout}>
            { props.coffeeList.map(coffee=>{
               return <Card key={coffee.id} href={`coffees/${coffee.id}`} src={coffee.imgUrl} name={coffee.name} className={styles.card} />
            })}
          </div>
      </main> 
    </div>
  )
}
