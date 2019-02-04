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
    });
};
