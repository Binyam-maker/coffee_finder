const handleUpVote = async (id, setCoffeeStore, coffeeStore) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  };

  try {
    await fetch("/api/likesCounter", requestOptions);
    setCoffeeStore({ ...coffeeStore, likes: coffeeStore.likes + 1 });
  } catch (error) {}
};
export default handleUpVote;
