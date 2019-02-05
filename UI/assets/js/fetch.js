const userMessage = (message, colour) => {
  let element = document.getElementById("dialog");
  element.innerHTML =
    `<div id="dialog-content">
            <div id="dialog-text">` +
    fomartErrorMessage(message) +
    `</div>
          </div>`;

  document.getElementById("dialog-content").style.background = colour;
  element.style.transform = "scale(1)";
  element.style.msTransform = "scale(1)"; //ie9
  element.style.WebkitTransform = "scale(1)"; //safari
};

const fomartErrorMessage = message => {
  if (Array.isArray(message)) {
    let newMessage = null;
    for (let i = 0; i < message.length; i++) {
      if (newMessage) newMessage += "<li>" + message[i] + "</li>";
      else newMessage = "<li>" + message[i] + "</li>";
    }

    return "<ul>" + newMessage + "</ul>";
  } else {
    return message;
  }
};

const getRedFlags = () => {
  // Add redflags from Api to web page

  return fetch("http://127.0.0.1:5000/ireporter/api/v2/red-flags")
    .then(response => response.json())
    .then(jsn => {
      let table_rows = `<tr>
                    <th>ID</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Created by</th>
                    <th>Created on</th>
                    <th></th>
                </tr>`;

      let data = jsn.data;
      for (let i = 0; i < data.length; i++) {
        table_rows +=
          "<tr><td>" +
          data[i].flag_id +
          "</td><td>" +
          data[i].location +
          "</td><td>" +
          data[i].type +
          "</td><td>" +
          data[i].status +
          "</td><td>" +
          data[i].createdby +
          "</td><td>" +
          data[i].createdon +
          '</td><td><a href="incident.html">view</a></td></tr>';
      }
      let element = document.getElementById("tableRows");
      element.innerHTML = table_rows;
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
      userMessage(err, "#f5313180");
    });
};

const login = body => {
  // post login

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "content-Type": "application/json"
    })
  };

  return fetch("http://127.0.0.1:5000/ireporter/api/v2/auth/login", options)
    .then(response => response.json())
    .then(data => {
      if (data.status == 200) {
        localStorage.setItem(
          "currentUserIsAdmin",
          data.data[0]["user"]["isAdmin"]
        );
        localStorage.setItem(
          "currentUserUsername",
          data.data[0]["user"]["username"]
        );
        localStorage.setItem("currentUserId", data.data[0]["user"]["id"]);
        localStorage.setItem("currentUserToken", data.data[0]["token"]);

        window.location.href = "./incidents/list.html";
      } else {
        userMessage(data.error, "#f5313180");
      }
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
      userMessage(err, "#f5313180");
    });
};

const logout = () => {
  // logout

  const options = {
    method: "GET",
    headers: new Headers({
      "content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("currentUserToken")
    })
  };

  return fetch("http://127.0.0.1:5000/ireporter/api/v2/auth/logout", options)
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        localStorage.setItem("currentUserId", null);
        localStorage.setItem("currentUserIsAdmin", null);
        localStorage.setItem("currentUserUsername", null);
        localStorage.setItem("currentUserToken", null);

        window.location.href = "../index.html";
      } else {
        console.log("Logout Error see response object:-S ", data);
        throw new Error("error logging out!");
      }
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
      userMessage(err, "#f5313180");
    });
};

const signup = body => {
  // post login

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "content-Type": "application/json"
    })
  };

  return fetch("http://127.0.0.1:5000/ireporter/api/v2/auth/signup", options)
    .then(response => response.json())
    .then(data => {
      if (data.status == 201) {
        localStorage.setItem(
          "userMassage",
          "Account successfully created. Please login."
        );
        window.location.href = "index.html";
      } else {
        userMessage(data.error, "#f5313180");
      }
    })
    .catch(err => {
      console.log("Fetch Error: ", err);
      userMessage(err, "#f5313180");
    });
};
