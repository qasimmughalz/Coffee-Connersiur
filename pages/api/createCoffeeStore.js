import { getMinifiedRecord, table } from "../../lib/airtable";


const coffeeStore = async (req, res) => {
  const { id, name, address, neighbourhood, imgUrl, voting } = req.body;
  try {
    if (id) {
      const findStore = await tablee
        .select({
          filterByFormula: `id=${id}`,
        })
        .firstPage();

      if (findStore.length != 0) {
        const record = getMinifiedRecord(findStore)
        return res.json({ msg: record });
      } else {
        if (name) {
          const createRecord = await table.create([
            {
              fields: {
                id,
                name,
                address,
                neighbourhood,
                voting,
                imgUrl,
              },
            },
          ]);

          return res.json({ msg: createRecord });
        } else {
          return res.json({ error: "Name is missing" });
        }
      }
    } else {
      return res.json({ error: "id is missing" });
    }
  } catch (error) {
    return res.json({ error: "Something went wrong" });
  }
};

export default coffeeStore;
