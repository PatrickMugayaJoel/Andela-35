const getIncident = params => {
  // Get Incident from Api to web page

  return fetch(
    "https://bootcamp15app.herokuapp.com/ireporter/api/v2/" +
      params.type +
      "/" +
      params.id
  )
    .then(response => response.json())
    .then(jsn => {
      if (jsn.error) {
        userMessage(jsn.error, "rgb(224, 35, 35)");
      } else {
        const data = jsn.data;

        let location = data.location.split(",");

        document.getElementById("latitude").value = data.location;
        document.getElementById("latitude").value = location[0];
        document.getElementById("longitude").value = location[1].trim();
        document.getElementById("title").value = data.title;
        document.getElementById("description").value = data.comment;
      }
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};

const updateIncident = body => {
  // update incident

  const options = {
    method: "PUT",
    body: JSON.stringify(body),
    headers: new Headers({
      "content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("currentUserToken")
    })
  };

  return fetch(
    "https://bootcamp15app.herokuapp.com/ireporter/api/v2/incidents/" + body.id,
    options
  )
    .then(response => response.json())
    .then(data => {
      if (data.status == 200) {
        localStorage.setItem("userMassage", " successfully updated.");
        window.location.href =
          "incident.html?id=" + body.id + "&type=" + body.mytype;
      } else {
        userMessage(data.error, "rgb(224, 35, 35)");
      }
    })
    .catch(err => {
      console.log("Fetch Error: ", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};
