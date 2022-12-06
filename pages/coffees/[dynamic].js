import { useRouter } from "next/router"

import coffeeData from '../../data/coffee-stores.json'


export function getStaticPaths() {
  return {
    paths: [{ params: { dynamic: "0" } }, { params: { dynamic: "1" } }],
    fallback: false, 
  }
}

export function getStaticProps({params}) {
  console.log('================ check', params)

  return {
    props: {
      cofeeList: coffeeData.find(coffee =>{
        return coffee.id.toString() === params.dynamic})
      }
  }
}

const CoffeeItem = (props)=>{
    const router = useRouter()
    console.log('see router', router)
    console.log('check', router.query.dynamic)
    return (<div>
        <h2> {props.cofeeList.name} </h2>   
        <p>{props.cofeeList.address}</p>

    </div>)
}


export default CoffeeItem