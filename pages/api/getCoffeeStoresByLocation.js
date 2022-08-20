import getCoffeeStores from "../../lib/coffee-store";
export default async function (req, res) {
  try {
    const { latLong } = req.query;
    const coffeeStores = await getCoffeeStores("", latLong);
    res.status(200).json({ coffeeStores: coffeeStores });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}
