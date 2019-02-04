const userNav = `
<div class="menu">
  <button onclick="myFunction()" class="dropbtn">&#9776;</button>
  <div id="mymenu" class="menu-content">
    <a href="../userprofile.html">Profile</a>
    <a class="active" href="list.html">Incidents</a>
    <a onclick="logout()">Logout</a>
  </div>
</div>

<div id="logo"><img src="../../assets/images/logo.png" /></div>

<ul id="main" class="inlineblock">
  <li><a href="../userprofile.html">Profile</a></li>
  <li class="active"><a href="list.html">Incidents</a></li>
  <li><a onclick="logout()">Logout</a></li>
</ul>

<ul class="usertype inlineblock">
  <li id="loggedinAs"></li>
</ul>`;

const adminNav = `
<div class="menu">
  <button onclick="myFunction()" class="dropbtn">&#9776;</button>
  <div id="mymenu" class="menu-content">
    <a href="../userprofile.html">Profile</a>
    <a href="../users.html">Users</a>
    <a class="active" href="list.html">Incidents</a>
    <a onclick="logout()">Logout</a>
  </div>
</div>

<div id="logo"><img src="../../assets/images/logo.png" /></div>

<ul id="main" class="inlineblock">
  <li><a href="../userprofile.html">Profile</a></li>
  <li><a href="../users.html">Users</a></li>
  <li class="active"><a href="list.html">Incidents</a></li>
  <li><a onclick="logout()">Logout</a></li>
</ul>

<ul class="usertype inlineblock">
  <li id="loggedinAs"></li>
</ul>`;
