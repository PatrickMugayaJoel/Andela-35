const getImages = () => {
  // get images

  const urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");

  return fetch(
    "https://challenge-four.herokuapp.com/ireporter/api/v2/red-flags/" +
      id +
      "/images"
  )
    .then(response => response.json())
    .then(data => {
      if (data.data) {
        let images = data.data;

        let table = "";
        if (images.length != 1) {
          table = "<table><tr>";
        } else {
          table = `<table style="width:65%;"><tr>`;
        }

        for (let i = 0; i < images.length; i++) {
          if (i % 3 == 2) {
            table +=
              `<td>
              <a href="https://challenge-four.herokuapp.com/ireporter/api/v2/files/images/` +
              images[i] +
              `">
            <img
                src="https://challenge-four.herokuapp.com/ireporter/api/v2/files/images/` +
              images[i] +
              `"
            /><a>
            </td></tr><tr>`;
          } else {
            table +=
              `<td>
              <a href="https://challenge-four.herokuapp.com/ireporter/api/v2/files/images/` +
              images[i] +
              `">
            <img
                src="https://challenge-four.herokuapp.com/ireporter/api/v2/files/images/` +
              images[i] +
              `"
            /><a>
            </td>`;
          }
        }

        table += `
              <td id="uploading">
                <div onclick="document.getElementById('file').click()">
                  <img src="../../assets/images/add.svg" alt="image" />
                </div>
              </td>
            </tr>
          </table>`;

        document.getElementById("showimgs").innerHTML = table;
      } else if (data.error) {
        userMessage(data.error, "rgb(224, 35, 35)");
        document.getElementById("showimgs").innerHTML = `<table>
          <tr>
          <td id="uploading">
            <div onclick="document.getElementById('file').click()">
              <img src="../../assets/images/add.svg" alt="image" />
            </div>
          </td>
        </tr>
      </table>
        `;
      } else {
        console.log(data);
        document.getElementById("showimgs").innerHTML = `<table>
          <tr>
          <td id="uploading">
            <div onclick="document.getElementById('file').click()">
              <img src="../../assets/images/add.svg" alt="image" />
            </div>
          </td>
        </tr>
      </table>
        `;
      }
    })
    .catch(err => {
      console.log("Fetch Error: ", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};
