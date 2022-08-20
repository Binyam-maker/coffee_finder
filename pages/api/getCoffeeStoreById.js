import connectDB from "../../lib/mongodb";
import CoffeeStore from "../../model/CoffeeStore";
import { StatusCodes } from "http-status-codes";

export default async function (req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Only GET requests are allowed" });
  }
  const id = req.query;

  // Connect to a DB
  await connectDB();
  try {
    const coffeeStore = await CoffeeStore.findOne(id);

    if (coffeeStore) {
      res.status(StatusCodes.OK).json({ coffeeStore });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Did not found coffee store" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ msg: "Getting Coffee Store Failed" });
  }
}
