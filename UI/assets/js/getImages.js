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

        for (let i = 0; i < images.length; i++) {
          table +=
            `
          <a
          href="https://challenge-four.herokuapp.com/ireporter/api/v2/files/images/` +
            images[i] +
            `"
        >
          <div
            class="showimgs"
            style="background-image: url('https://challenge-four.herokuapp.com/ireporter/api/v2/files/images/` +
            images[i] +
            `'), url('../../assets/images/image-not-found.jpg')"
          ></div>
        </a>
        `;
        }

        table += `
        <div id="uploading" onclick="document.getElementById('file').click()">
        <img src="../../assets/images/add.svg" alt="image" />
      </div>`;

        document.getElementById("showimgs").innerHTML = table;
      } else if (data.error) {
        userMessage(data.error, "rgb(224, 35, 35)");
        document.getElementById("showimgs").innerHTML = `
        <div id="uploading" onclick="document.getElementById('file').click()">
        <img src="../../assets/images/add.svg" alt="image" />
      </div>
        `;
      } else {
        console.log(data);
        document.getElementById("showimgs").innerHTML = `
        <div id="uploading" onclick="document.getElementById('file').click()">
        <img src="../../assets/images/add.svg" alt="image" />
      </div>
        `;
      }
    })
    .catch(err => {
      console.log("Fetch Error: ", err);
      userMessage(err, "rgb(224, 35, 35)");
    });
};
