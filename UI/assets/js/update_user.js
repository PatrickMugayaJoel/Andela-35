const getUser = id => {
  // Get user from Api to web page

  const options = {
    method: "GET",
    headers: new Headers({
      "content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("currentUserToken")
    })
  };

  return fetch(
    "https://bootcamp15app.herokuapp.com/ireporter/api/v2/users/" + id,
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
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
      userMessage(err, "#f5313180");
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
    "https://bootcamp15app.herokuapp.com/ireporter/api/v2/users/" + body.id,
    options
  )
    .then(response => response.json())
    .then(data => {
      if (data.status == 200) {
        localStorage.setItem("userMassage", "User successfully updated.");
        window.location.href = "userprofile.html?id=" + data["data"][0]["id"];
      } else {
        userMessage(data.error, "#f5313180");
      }
    })
    .catch(err => {
      console.log("Fetch Error: ", err);
      userMessage(err, "#f5313180");
    });
};
