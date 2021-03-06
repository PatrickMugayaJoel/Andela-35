const updateUser = body => {
  // update user

  const options = {
    method: "PUT",
    body: JSON.stringify(body),
    headers: new Headers({
      "content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("currentUserToken")
    })
  };

  document.getElementById("loader").style.display = "block";
  return fetch(
    "https://ireporter-bootcamp.herokuapp.com/ireporter/api/v2/users/" + body.id,
    options
  )
    .then(response => response.json())
    .then(data => {
      if (data.status == 200) {
        localStorage.setItem("userMassage", "User successfully updated.");
        window.location.href = "userprofile.html?id=" + data["data"][0]["id"];
      } else {
        if (data.error && data.error == "Signature verification failed") {
          userMessage("Network Error", "rgb(224, 35, 35)");
        } else {
          userMessage(data.error, "rgb(224, 35, 35)");
        }
      }

      document.getElementById("loader").style.display = "none";
    })
    .catch(err => {
      document.getElementById("loader").style.display = "none";
      console.log("Fetch Error: ", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};
