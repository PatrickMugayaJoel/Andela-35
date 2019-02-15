const updateStatus = (type, id) => {
  // update incident's status

  let body = { status: document.getElementById(id).value };

  const options = {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: new Headers({
      "content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("currentUserToken")
    })
  };

  return fetch(
    "https://challenge-four.herokuapp.com/ireporter/api/v2/" +
      type +
      "/" +
      id +
      "/status",
    options
  )
    .then(response => response.json())
    .then(data => {
      if (data.status == 200) {
        localStorage.setItem("userMassage", " successfully updated.");
        window.location.href = "list.html";
      } else {
        userMessage(data.error, "rgb(224, 35, 35)");
      }
    })
    .catch(err => {
      console.log("Fetch Error: ", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};
