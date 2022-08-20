// Get Data From four square api
const fetchFourSquareData = async ({ query, near, fsq_id, latLong }) => {
  let data = [];
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const url = fsq_id
    ? `https://api.foursquare.com/v3/places/${fsq_id}`
    : latLong
    ? `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}`
    : `https://api.foursquare.com/v3/places/search?query=${query}&near=${near}`;

  try {
    const res = await fetch(url, options);
    data = await res.json();

    return data;
  } catch (error) {}
};

export default fetchFourSquareData;
