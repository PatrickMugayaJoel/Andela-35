const getRedFlags = () => {
  // Add redflags from Api to web page

  document.getElementById("loader").style.display = "block";
  return fetch(
    "https://challenge-four.herokuapp.com/ireporter/api/v2/red-flags"
  )
    .then(response => response.json())
    .then(jsn => {
      let table_rows = `<tr>
                    <th>Title</th>
                    <th>type</th>
                    <th>Status</th>
                    <th>Created by</th>
                    <th>Created on</th>
                </tr>`;

      if (jsn.error) {
        table_rows +=
          "<tr><td id='emptytable' colspan='7'>" + jsn.error + "</td></tr>";
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;
      } else {
        let data = jsn.data;

        for (let i = 0; i < data.length; i++) {
          let type = `<i class="blueth">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>`;
          if (data[i].type == "red-flag") {
            type = `<i class="redth">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>`;
          }

          let selectoptions = `
          <option value=''> - select - </option>
          <option value='under investigation'>Under Investigation</option>
          <option value='rejected'>Rejected</option>
          <option value='resolved'>Resolved</option>
          `;

          if (data[i].status == "rejected") {
            selectoptions = `
  <option value='under investigation'>Under Investigation</option>
  <option selected value='rejected'>Rejected</option>
  <option value='resolved'>Resolved</option>
  `;
          } else if (data[i].status == "resolved") {
            selectoptions = `
  <option value='under investigation'>Under Investigation</option>
  <option value='rejected'>Rejected</option>
  <option selected value='resolved'>Resolved</option>
  `;
          } else if (data[i].status == "under investigation") {
            selectoptions = `
  <option selected value='under investigation'>Under Investigation</option>
  <option value='rejected'>Rejected</option>
  <option value='resolved'>Resolved</option>
  `;
          }

          let myselect = `<td>` + data[i].status + `</td>`;
          if (localStorage.getItem("currentUserIsAdmin") == "true") {
            myselect =
              `<td class='select-status'><form>
  <select id='` +
              data[i].flag_id +
              `' onchange="updateStatus('red-flags', ` +
              data[i].flag_id +
              `)">` +
              selectoptions +
              `</select>
  </form></td>`;
          }

          table_rows +=
            "<tr><td><a href='incident.html?id=" +
            data[i].flag_id +
            "&type=" +
            data[i].type +
            "'>" +
            data[i].title +
            `</a></td>
            <td>` +
            type +
            `</td>` +
            myselect +
            `<td>` +
            data[i].username +
            "</td><td>" +
            data[i].createdon +
            "</td></tr>";
        }
        document.getElementById("incidenttitle").innerHTML = "Redflags";
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;
      }

      document.getElementById("loader").style.display = "none";
    })
    .catch(err => {
      document.getElementById("loader").style.display = "none";
      console.log("Fetch Error :-S", err);
      userMessage(err, "rgb(224, 35, 35)");
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

  document.getElementById("loader").style.display = "block";
  return fetch(
    "https://challenge-four.herokuapp.com/ireporter/api/v2/auth/login",
    options
  )
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
        userMessage(data.error, "rgb(224, 35, 35)");
      }

      document.getElementById("loader").style.display = "none";
    })
    .catch(err => {
      document.getElementById("loader").style.display = "none";
      console.log("Fetch Error :-S", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};

const signup = body => {
  // post user

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "content-Type": "application/json"
    })
  };

  document.getElementById("loader").style.display = "block";
  return fetch(
    "https://challenge-four.herokuapp.com/ireporter/api/v2/auth/signup",
    options
  )
    .then(response => response.json())
    .then(data => {
      if (data.status == 201) {
        localStorage.setItem(
          "userMassage",
          "Account successfully created. Please login."
        );
        window.location.href = "index.html";
      } else {
        userMessage(data.error, "rgb(224, 35, 35)");
      }

      document.getElementById("loader").style.display = "none";
    })
    .catch(err => {
      document.getElementById("loader").style.display = "none";
      console.log("Fetch Error: ", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};

const createIncident = body => {
  // post incident

  console.log(body);

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("currentUserToken")
    })
  };

  document.getElementById("loader").style.display = "block";
  return fetch(
    "https://challenge-four.herokuapp.com/ireporter/api/v2/" + body.type,
    options
  )
    .then(response => response.json())
    .then(data => {
      if (data.status == 201) {
        console.log(data.data[0].message);
        // localStorage.setItem(
        //   "userMassage", data.message);
        window.location.href = "list.html";
      } else {
        userMessage(data.error, "rgb(224, 35, 35)");
      }

      document.getElementById("loader").style.display = "none";
    })
    .catch(err => {
      document.getElementById("loader").style.display = "none";
      console.log("Fetch Error: ", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};

const getIncident = params => {
  // Get Incident from Api to web page

  document.getElementById("loader").style.display = "block";
  return fetch(
    "https://challenge-four.herokuapp.com/ireporter/api/v2/" +
      params.type +
      "/" +
      params.id
  )
    .then(response => response.json())
    .then(jsn => {
      if (jsn.error) {
        let element = document.getElementById("incident");
        element.innerHTML =
          "<table><tr><td id='emptytable' colspan='7'>" +
          jsn.error +
          "</td></tr></table>";
      } else {
        const data = jsn.data;

        let location = data.location.split(",");

        const table =
          `
      <div id="incidentheader"><h3>` +
          data.title +
          `</h3></div>
          <div class="button_two pullleft">
          <button onclick="window.location.href = 'update_incident.html?id=` +
          data.flag_id +
          `&type=` +
          data.type +
          `'">Edit ` +
          data.type +
          `</button>
          <button class="two_right" onclick="window.location.href = 'location.html?longitude=` +
          location[0] +
          `&latitude=` +
          location[1].trim() +
          `&title=` +
          data.title +
          `'">location</button>
          </div> <table>
            <tr id="incidentbody">
              <td class="label"><b>Description</b></td>
              <td>` +
          data.comment +
          `</td>
            </tr>
            <tr id="footrow">
              <td colspan="2">
                <small>
                  <span
                    ><b>Type:</b>
                    <div>` +
          data.type +
          `</div></span
                  >
                  <span
                    ><b>Status:</b>
                    <div>` +
          data.status +
          `</div></span
                  >
                  <span
                    ><b>Location:</b>
                    <div>` +
          data.location +
          `</div></span
                  >
                  <span
                    ><b>By:</b>
                    <div>` +
          data.username +
          `</div></span
                  >
                  <span
                    ><b>On:</b>
                    <div>` +
          data.createdon +
          `</div></span
                  >
                </small>
              </td>
            </tr>
          </table>
      `;

        let element = document.getElementById("incident");
        element.innerHTML = table;
      }

      document.getElementById("loader").style.display = "none";
    })
    .catch(err => {
      document.getElementById("loader").style.display = "none";
      console.log("Fetch Error :-S", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};

const getUsers = () => {
  // Get users from Api to web page

  const options = {
    method: "GET",
    headers: new Headers({
      "content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("currentUserToken")
    })
  };

  document.getElementById("loader").style.display = "block";
  return fetch(
    "https://challenge-four.herokuapp.com/ireporter/api/v2/users",
    options
  )
    .then(response => response.json())
    .then(jsn => {
      let table_rows = `<tr>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Admin</th>
        </tr>`;

      if (jsn.msg && jsn.msg == "Signature verification failed") {
        table_rows +=
          "<tr><td id='emptytable' colspan='6'>Network Error</td></tr>";
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;

        document.getElementById("loader").style.display = "none";
        return;
      } else if (jsn.error) {
        table_rows +=
          "<tr><td id='emptytable' colspan='6'>" + jsn.error + "</td></tr>";
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;
      } else if (jsn.data[0].message) {
        table_rows +=
          "<tr><td id='emptytable' colspan='6'>" +
          jsn.data[0].message +
          "</td></tr>";
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;
      } else {
        let data = jsn.data;

        for (let i = 0; i < data.length; i++) {
          table_rows +=
            "<tr><td><a href='userprofile.html?id=" +
            data[i].userid +
            "'>" +
            data[i].username +
            "</a></td><td>" +
            data[i].firstname +
            "</td><td>" +
            data[i].lastname +
            "</td><td>" +
            data[i].email +
            "</td><td>" +
            data[i].phonenumber +
            "</td><td>" +
            data[i].is_admin +
            "</td></tr>";
        }
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;
      }

      document.getElementById("loader").style.display = "none";
    })
    .catch(err => {
      document.getElementById("loader").style.display = "none";
      console.log("Fetch Error :-S", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};

const uploadFile = () => {
  // Upload File post

  let form = new FormData();
  form.append("type", "image");

  const myinput = document.querySelector("#file");
  form.append("file", myinput.files[0]);

  const urlParams = new URLSearchParams(window.location.search);
  form.append("id", urlParams.get("id"));

  const options = {
    method: "POST",
    body: form,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  delete options.headers["Content-Type"];

  document.getElementById("uploading").innerHTML =
    "<div>Uploading..<br>Please wait</div>";
  return fetch(
    "https://challenge-four.herokuapp.com/ireporter/api/v2/red-flags/1/images",
    options
  )
    .then(response => response.json())
    .then(data => {
      if (data.status == 201) {
        getImages();
      } else if (data.error) {
        userMessage(data.error, "rgb(224, 35, 35)");
      } else {
        userMessage("Upload failed!", "rgb(224, 35, 35)");
      }
    })
    .catch(err => {
      console.log("Fetch Error: ", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};
