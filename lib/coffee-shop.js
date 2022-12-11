
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.Unsplash_Access_Key,
});

export const FetchCoffeeShops = async ()=>{


    const photos = await unsplash.search.getPhotos({
        query: "coffee shop",
        perPage: 10,
        page:10
      });

      const pics = photos.response.results.map((img)=> img.urls['small'] )
      

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.API_KEY
        }
      };
      
      const response = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&ll=41.8781%2C-87.6298&limit=10', options)

      
      const data = await response.json()
        
      return data.results.map((data, index)=>{
        return {
            id: data.fsq_id, 
            name : data.name,
            imgUrl: pics.length > 0 ? pics[index] : ''
        }
      })
}