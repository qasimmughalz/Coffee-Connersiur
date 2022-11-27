import Head from 'next/head'
import Banner from '../components/banner/banner'
import styles from '../styles/Home.module.css'

export default function Home() {

  const handleBannerBtn = ()=>{
   alert('hi')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <Banner text='Nearby Shops' handleClick={handleBannerBtn}/>

          

      </main> 


      
    </div>
  )
}
