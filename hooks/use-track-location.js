import { useState } from "react"

const locationTracker = ()=>{

    const [errorMsg, setErrorMsg] = useState('')
    const [latLong, setLatLong] = useState('')
    const [isLoading, setIsLoading]= useState(false)


    const success = ( position)=>{

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setLatLong(`${latitude}, ${longitude} `)
        setErrorMsg('')
        setIsLoading(false)
    }

    const error = ()=>{
        setIsLoading(false)
        setErrorMsg('Error in getting Google Location')
    }

    const handleLocation = ()=>{
        setIsLoading(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success ,error);

          } else {
            setErrorMsg("Geolocation is not supported by this browser.");
          }
    }

    return {
        latLong,
        handleLocation,
        errorMsg, 
        isLoading
    }

}

export default locationTracker