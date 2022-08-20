import connectDB from "../../lib/mongodb";
import CoffeeStore from "../../model/CoffeeStore";
import { StatusCodes } from "http-status-codes";
export default async function (req, res) {
  const { coffeeStore } = req.body;

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests are allowed" });
    return;
  }

  try {
    // Connect to DB

    await connectDB();

    // Check if coffee store already exists
    const alreadyExists = await CoffeeStore.findOne({
      id: coffeeStore.id,
    }).exec();

    // Create a document
    if (!alreadyExists) {
      const oneCoffeeStore = await CoffeeStore.create(coffeeStore);

      res.status(StatusCodes.CREATED).json(oneCoffeeStore);
    }
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Coffee store already in database." });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
}
