import fetchFourSquareData from "./fetch-fsq-data";
import getPictures from "./get-picture";

//Get coffee stores

// Get data and picture from 2 functions, then assemble and return usable data
const coffeeStores = async (fsq_id, latLong) => {
  // get query data

  const data = latLong
    ? await fetchFourSquareData({ query: "coffee", latLong })
    : fsq_id
    ? await fetchFourSquareData({ query: "coffee", fsq_id })
    : await fetchFourSquareData({ query: "coffee", near: "toronto" });

  // get pictures array
  const pictures = await getPictures({ query: "coffee store" });

  //  refactor the fetched data, send empty array if data is undefined
  const coffeeHouseData =
    data?.results?.map((venue, index) => {
      // Get neighborhood in string format
      const neighborhood = venue.location.neighborhood
        ? venue.location.neighborhood[0]
        : "";

      // an item in the new array will have the following values
      return {
        id: venue.fsq_id,
        name: venue.name,
        address: venue.location["address"],
        neighborhood,
        imgUrl: pictures[index],
        likes: 1,
      };
    }) || [];

  return coffeeHouseData;
};

export default coffeeStores;
