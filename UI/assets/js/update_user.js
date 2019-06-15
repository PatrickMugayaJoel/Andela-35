const getUser = id => {
  // Get user from Api to web page

  const options = {
    method: "GET",
    headers: new Headers({
      "content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("currentUserToken")
    })
  };

  document.getElementById("loader").style.display = "block";
  return fetch(
    "https://ireporter-bootcamp.herokuapp.com/ireporter/api/v2/users/" + id,
    options
  )
    .then(response => response.json())
    .then(jsn => {
      if (jsn.error) {
        let element = document.getElementById("tableRows");
        element.innerHTML =
          "<tr><td id='emptytable' colspan='6'>" + jsn.error + "</td></tr>";
      } else {
        let user = jsn.data[0];

        document.getElementById("username").value = user.username;
        document.getElementById("password").value = user.password;
        document.getElementById("email").value = user.email;
        document.getElementById("lastname").value = user.lastname;
        document.getElementById("firstname").value = user.firstname;
        document.getElementById("phonenumber").value = user.phonenumber;
      }

      document.getElementById("loader").style.display = "none";
    })
    .catch(err => {
      document.getElementById("loader").style.display = "none";
      console.log("Fetch Error :-S", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};

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
