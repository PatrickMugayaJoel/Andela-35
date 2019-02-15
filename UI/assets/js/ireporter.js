const myFunction = () => {
  document.getElementById("mymenu").classList.toggle("show");
};

// Close the menu if the user clicks outside of it
window.onclick = event => {
  if (!event.target.matches(".dropbtn")) {
    var menus = document.getElementsByClassName("menu-content");
    var i;
    for (i = 0; i < menus.length; i++) {
      var openmenu = menus[i];
      if (openmenu.classList.contains("show")) {
        openmenu.classList.remove("show");
      }
    }
  }
};

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

const logout = () => {
  // logout

  const options = {
    method: "GET",
    headers: new Headers({
      "content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("currentUserToken")
    })
  };

  return fetch(
    "https://challenge-four.herokuapp.com/ireporter/api/v2/auth/logout",
    options
  )
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("currentUserId", null);
      localStorage.setItem("currentUserIsAdmin", null);
      localStorage.setItem("currentUserUsername", null);
      localStorage.setItem("currentUserToken", null);

      if (data.message) {
        window.location.href = "../index.html";
      } else {
        console.log("Logout Error see response object:-S ", data);
        throw new Error("error logging out!");
      }
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
      window.location.href = "../index.html";
    });
};

const logout2 = () => {
  // logout

  const options = {
    method: "GET",
    headers: new Headers({
      "content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("currentUserToken")
    })
  };

  return fetch(
    "https://challenge-four.herokuapp.com/ireporter/api/v2/auth/logout",
    options
  )
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("currentUserId", null);
      localStorage.setItem("currentUserIsAdmin", null);
      localStorage.setItem("currentUserUsername", null);
      localStorage.setItem("currentUserToken", null);

      if (data.message) {
        window.location.href = "index.html";
      } else {
        console.log("Logout Error see response object:-S ", data);
        throw new Error("error logging out!");
      }
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
      window.location.href = "index.html";
    });
};
