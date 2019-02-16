const userNav = `
<div class="menu">
  <button onclick="myFunction()" class="dropbtn">&#9776;</button>
  <div id="mymenu" class="menu-content">
  <a id="profilea" href="../userprofile.html"><i class="icon"><img src="../../assets/icons/profile-pg.png" /></i> <div>Profile</div></a>
  <a id="incidenta" href="list.html"><i class="icon"><img src="../../assets/icons/flag.png" /></i> <div>Incidents</div></a>
  <a onclick="logout()"><i class="icon"><img src="../../assets/icons/logout.png" /></i> <div>Logout</div></a>
  </div>
</div>

<div id="logo"><img src="../../assets/images/logo.png" /></div>

<ul id="main" class="inlineblock">
  <li id="profilel"><a href="../userprofile.html"><i class="icon"><img src="../../assets/icons/profile-pg.png" /></i> <div>Profile</div></a></li>
  <li id="incidentl"><a href="list.html"><i class="icon"><img src="../../assets/icons/flag.png" /></i> <div>Incidents</div></a></li>
  <li><a onclick="logout()"><i class="icon"><img src="../../assets/icons/logout.png" /></i>  <div>Logout</div></a></li>
</ul>

<ul class="usertype inlineblock">
  <li id="loggedinAs"></li>
</ul>`;

const adminNav = `
<div class="menu">
  <button onclick="myFunction()" class="dropbtn">&#9776;</button>
  <div id="mymenu" class="menu-content">
  <a id="profilea" href="../userprofile.html"><i class="icon"><img src="../../assets/icons/profile-pg.png" /></i> <div>Profile</div></a>
  <a id="usersa" href="../users.html"><i class="icon"><img src="../../assets/icons/team.png" /></i> <div>Users</div></a>
  <a id="incidenta" href="list.html"><i class="icon"><img src="../../assets/icons/flag.png" /></i> <div>Incidents</div></a>
    <a onclick="logout()"><i class="icon"><img src="../../assets/icons/logout.png" /></i> <div>Logout</div></a>
  </div>
</div>

<div id="logo"><img src="../../assets/images/logo.png" alt="logo" /></div>

<ul id="main" class="inlineblock">
  <li id="profilel"><a href="../userprofile.html"><i class="icon"><img src="../../assets/icons/profile-pg.png" /></i> <div>Profile</div></a></li>
  <li id="usersl"><a href="../users.html"><i class="icon"><img src="../../assets/icons/team.png" /></i> <div>Users</div></a></li>
  <li id="incidentl"><a href="list.html"><i class="icon"><img src="../../assets/icons/flag.png" /></i> <div>Incidents</div></a></li>
  <li><a onclick="logout()"><i class="icon"><img src="../../assets/icons/logout.png" /></i> <div>Logout</div></a></li>
</ul>

<ul class="usertype inlineblock">
  <li id="loggedinAs"></li>
</ul>`;
