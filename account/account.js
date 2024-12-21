document.addEventListener("DOMContentLoaded", async function () {
  let response = await fetch('fetchData.php');
  // check if the user is logged in. The php will return a 401 response code if not
  if (response.status === 401) {
    // Redirect to the signup page
    window.location.href = '../signup/';
    return;
  }
  let data = await response.json();
  let picContainer = document.getElementById("profilePicContainer");
  let profileInfo = document.getElementById("profileInfo");
  let img = document.createElement("img");
  img.src = data["image"]
  img.alt = "profile_picture";
  img.id = "profilePic";
  picContainer.innerHTML = '';
  picContainer.appendChild(img);
  profileInfo.innerHTML = `${data["username"]}<br>${data["email"]}`;
})
