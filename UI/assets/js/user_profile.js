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
    "https://challenge-four.herokuapp.com/ireporter/api/v2/users/" + id,
    options
  )
    .then(response => response.json())
    .then(jsn => {
      if (jsn.msg && jsn.msg == "Signature verification failed") {
        let table_rows =
          "<tr><td id='emptytable' colspan='6'>Network Error</td></tr>";
        let element = document.getElementById("tableRows");
        element.innerHTML = table_rows;
      } else if (jsn.error) {
        let element = document.getElementById("tableRows");
        element.innerHTML =
          "<tr><td id='emptytable' colspan='6'>" + jsn.error + "</td></tr>";
      } else {
        let data = jsn.data[0];

        let myselect = `<td>` + data.is_admin + `</td>`;

        let selectoptions = `
        <option value='true'>true</option>
<option selected value='false'>false</option>
`;
        if (data.is_admin) {
          selectoptions = `
          <option selected value='true'>true</option>
  <option value='false'>false</option>
  `;
        }

        if (localStorage.getItem("currentUserIsAdmin") == "true") {
          myselect =
            `<td class='select-status'><form>
<select id='isadmin' onchange="adminRights(` +
            data.userid +
            `)">` +
            selectoptions +
            `
</select>
</form></td>`;
        }

        let element = document.getElementById("tableRows");
        element.innerHTML =
          `
          <tr class="userrow">
          <td class="label">ID:</td>
          <td>` +
          data.userid +
          `</td>
        </tr>
        <tr class="userrow">
          <td class="label">Username:</td>
          <td>` +
          data.username +
          `</td>
        </tr>
        <tr class="userrow">
          <td class="label">Name:</td>
          <td>` +
          data.firstname +
          ` ` +
          data.lastname +
          ` </td>
        </tr>
        <tr class="userrow">
          <td class="label">Email:</td>
          <td>` +
          data.email +
          `</td>
        </tr>
        <tr class="userrow">
          <td class="label">Phone Number:</td>
          <td>` +
          data.phonenumber +
          `</td>
        </tr>
        <tr class="userrow">
          <td class="label">Admin</td>` +
          myselect +
          `
        </tr>
        <tr class="userrow">
          <td class="label">Registered</td>
          <td>` +
          data.registered +
          `</td>
        </tr>
        <tr id="footrow">
          <td colspan="2">
          <small>
              <a class="button" href="updateuser.html?id=` +
          data.userid +
          `">Update user</a>
          </small>
          </td>
        </tr>`;
      }

      document.getElementById("loader").style.display = "none";
    })
    .catch(err => {
      document.getElementById("loader").style.display = "none";
      console.log("Fetch Error :-S", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};
