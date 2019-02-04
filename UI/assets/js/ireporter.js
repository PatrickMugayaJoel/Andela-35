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
