import {useRouter} from 'next/router'

const Dynamic = ()=>{
    const router = useRouter()
    console.log('router', router)

    return (<>
    <h1>This is dynamic Page Brother and the id is : {router.query.dynamic}</h1>
    
    </>)
}

export default Dynamic