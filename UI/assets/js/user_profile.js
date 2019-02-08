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
        let data = jsn.data[0];

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
          <td class="label">Admin</td>
          <td>` +
          data.is_admin +
          `</td>
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
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
      userMessage(err, "#f5313180");
    });
};
