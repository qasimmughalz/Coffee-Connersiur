
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.Unsplash_Access_Key,
});

export const FetchCoffeeShops = async (langlong)=>{


    // const photos = await unsplash.search.getPhotos({
    //     query: "coffee shop",
    //     perPage: 10,
    //     page:10
    //   });

      // const pics = photos.response.results.map((img)=> img.urls['small'] )
      

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3mcd5o8h0J7fZG2rthW+AOsZiGcIFKl/EWgK9Q2WwXUE='
        }
      };
      
      const response = await fetch(`https://api.foursquare.com/v3/places/search?ll=${langlong ? langlong : '-31.083332,150.916672'}`, options)
     
      const data = await response.json()
      console.log("data detail", data.results)
        
      return data.results.map((data, index)=>{
        return {
            id: data.fsq_id, 
            name : data.name,
            location: data.location.country,
            timezone: data.timezone
            // imgUrl: pics.length > 0 ? pics[index] : ''
        }
      })
}