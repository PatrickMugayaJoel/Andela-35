const getRedFlags = () => {
  // Add redflags from Api to web page

  return fetch("https://bootcamp15app.herokuapp.com/ireporter/api/v2/red-flags")
    .then(response => response.json())
    .then(jsn => {
      let table_rows = `<tr>
                    <th class='redth'>Title</th>
                    <th class='redth'>Status</th>
                    <th class='redth'>Created by</th>
                    <th class='redth'>Created on</th>
                </tr>`;

      if (jsn.error) {
        table_rows +=
          "<tr><td id='emptytable' colspan='7'>" + jsn.error + "</td></tr>";
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;
      } else {
        let data = jsn.data;

        for (let i = 0; i < data.length; i++) {
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

          let array = data[i].createdon.split(" ");
          let date =
            array[0] + " " + array[1] + " " + array[2] + " " + array[3];

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
            "</a></td>" +
            myselect +
            `<td>` +
            data[i].username +
            "</td><td>" +
            date +
            "</td></tr>";
        }
        document.getElementById("incidenttitle").innerHTML = "Redflags";
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;
      }
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
      userMessage(err, "#f5313180");
    });
};

const getInternvetions = () => {
  // Add redflags from Api to web page

  return fetch(
    "https://bootcamp15app.herokuapp.com/ireporter/api/v2/interventions"
  )
    .then(response => response.json())
    .then(jsn => {
      let table_rows = `<tr>
                    <th class='blueth'>Title</th>
                    <th class='blueth'>Status</th>
                    <th class='blueth'>Created by</th>
                    <th class='blueth'>Created on</th>
                </tr>`;

      if (jsn.error) {
        table_rows +=
          "<tr><td id='emptytable' colspan='7'>" + jsn.error + "</td></tr>";
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;
      } else {
        let data = jsn.data;

        for (let i = 0; i < data.length; i++) {
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

          let array = data[i].createdon.split(" ");
          let date =
            array[0] + " " + array[1] + " " + array[2] + " " + array[3];

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
            "</a></td>" +
            myselect +
            `<td>` +
            data[i].username +
            "</td><td>" +
            date +
            "</td></tr>";
        }
        document.getElementById("incidenttitle").innerHTML = "Internventions";
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;
      }
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

  return fetch(
    "https://bootcamp15app.herokuapp.com/ireporter/api/v2/auth/login",
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
        userMessage(data.error, "#f5313180");
      }
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
      userMessage(err, "#f5313180");
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

  return fetch(
    "https://bootcamp15app.herokuapp.com/ireporter/api/v2/auth/signup",
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
        userMessage(data.error, "#f5313180");
      }
    })
    .catch(err => {
      console.log("Fetch Error: ", err);
      userMessage(err, "#f5313180");
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

  return fetch(
    "https://bootcamp15app.herokuapp.com/ireporter/api/v2/" + body.type,
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
        userMessage(data.error, "#f5313180");
      }
    })
    .catch(err => {
      console.log("Fetch Error: ", err);
      userMessage(err, "#f5313180");
    });
};

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
        table_rows +=
          "<tr><td id='emptytable' colspan='7'>" + jsn.error + "</td></tr>";
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;
      } else {
        const data = jsn.data;

        let location = data.location.split(",");
        let array = data.createdon.split(" ");
        let date = array[0] + " " + array[1] + " " + array[2] + " " + array[3];

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
          date +
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
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
      userMessage(err, "#f5313180");
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

  return fetch(
    "https://bootcamp15app.herokuapp.com/ireporter/api/v2/users",
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

      if (jsn.error) {
        table_rows +=
          "<tr><td id='emptytable' colspan='6'>" + jsn.error + "</td></tr>";
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;
      } else if (jsn.status == 401) {
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
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
      userMessage(err, "#f5313180");
    });
};
