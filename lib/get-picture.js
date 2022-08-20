const getPictures = async ({ id, query }) => {
  const clientID = `?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`;
  const searchUrl = "https://api.unsplash.com//search/photos";
  const urlQuery = `&query=${query}`;
  const urlPage = `&page:1`;

  let url;

  url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;

  let pictures = [];
  try {
    const res = await fetch(url);
    const data = await res.json();

    pictures = data.results.map((picture) => picture.urls.regular);
  } catch (error) {}

  return pictures;
};

export default getPictures;
