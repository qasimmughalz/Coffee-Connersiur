var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.Airtable_API_Key,
});

var base = Airtable.base(process.env.Airtable_Base_Key);
const table = base("coffee-table");



const getMinifiedRecord = (record)=>{
    return record.map((record) => {
        return { ...record.fields };
      }); 
}








export {
    table,
    getMinifiedRecord
}