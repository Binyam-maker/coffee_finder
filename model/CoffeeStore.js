import { Schema, model, models } from "mongoose";

const CoffeeStoreSchema = new Schema({
  id: String,
  name: String,
  address: String,
  neighborhood: String,
  imgUrl: String,
  likes: {
    type: Number,
    default: 0,
  },
});

const CoffeeStore =
  models.CoffeeStore || model("CoffeeStore", CoffeeStoreSchema);

export default CoffeeStore;
