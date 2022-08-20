// Get users current location

async function sendPosition() {
  // Check if device has geolocation capabilities and act accordingly

  if ("geolocation" in navigator) {
    let latLong = "";
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("hello");
      latLong = `${position.coords.latitude}, ${position.coords.longitude}`;
    });
  } else {
  }
  return;
}

export default sendPosition;
