import connectDB from "../../lib/mongodb";
import CoffeeStore from "../../model/CoffeeStore";
import { StatusCodes } from "http-status-codes";

export default async function (req, res) {
  const { id } = req.body;

  try {
    // connect to DB
    await connectDB();

    const coffeeStore = await CoffeeStore.findOne({ id: id });

    coffeeStore.likes = coffeeStore.likes + 1;
    await coffeeStore
      .save()
      .then((newDoc) => res.status(StatusCodes.CREATED).json(newDoc));
  } catch (error) {}
}
