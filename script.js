// Hamburger menu
document.getElementById('hamburger').onclick = function() {
  document.getElementById('side-menu').classList.toggle('hidden');
};

// Simulazione login/logout con localStorage
function isLoggedIn() {
  return localStorage.getItem('loggedIn') === 'true';
}
function setLoggedIn(val) {
  localStorage.setItem('loggedIn', val ? 'true' : 'false');
}
function getUsername() {
  return localStorage.getItem('username') || 'Utente';
}

// Login/Logout
if (document.getElementById('user')) {
  document.getElementById('user').onclick = function() {
    window.location.href = 'login.html';
  };
}
if (document.getElementById('trophy')) {
  document.getElementById('trophy').onclick = function() {
    if (!isLoggedIn()) {
      window.location.href = 'login.html';
    } else {
      window.location.href = 'esercizi.html';
    }
  };
}

// Login form
if (document.getElementById('login-form')) {
  document.getElementById('login-form').onsubmit = function(e) {
    e.preventDefault();
    setLoggedIn(true);
    alert('Login effettuato!');
    window.location.href = 'index.html';
  };
}
if (document.getElementById('register-form')) {
  document.getElementById('register-form').onsubmit = function(e) {
    e.preventDefault();
    setLoggedIn(true);
    alert('Registrazione effettuata!');
    window.location.href = 'index.html';
  };
}

// Proteggi esercizi.html
if (window.location.pathname.endsWith('esercizi.html') && !isLoggedIn()) {
  window.location.href = 'login.html';
}

// Esempio di esercizi svolti
if (document.getElementById('esercizi-list')) {
  document.getElementById('esercizi-list').innerHTML = `
    <h2>I tuoi esercizi svolti</h2>
    <ul>
      <li>Livello A1 - Gioco 1 - 15/11/2025</li>
      <li>Livello B2 - Gioco 3 - 10/11/2025</li>
    </ul>
  `;
}

// Timer per la pagina gioco
if (document.getElementById('timer')) {
  let seconds = 0;
  setInterval(() => {
    seconds++;
    let min = String(Math.floor(seconds / 60)).padStart(2, '0');
    let sec = String(seconds % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${min}:${sec}`;
  }, 1000);
}

// Fullscreen per la pagina gioco
if (document.getElementById('fullscreen-btn')) {
  document.getElementById('fullscreen-btn').onclick = function() {
    let container = document.getElementById('game-container');
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      document.getElementById('other-games').style.display = 'none';
    } else {
      document.exitFullscreen();
      document.getElementById('other-games').style.display = '';
    }
  };
}

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    let menu = document.createElement('div');
    menu.id = 'dropdown-menu';
    menu.style.position = 'absolute';
    menu.style.top = '60px';
    menu.style.left = '16px';
    menu.style.background = '#fff';
    menu.style.border = '1px solid #e6edf3';
    menu.style.borderRadius = '10px';
    menu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    menu.style.padding = '10px 0';
    menu.style.display = 'none';
    menu.style.zIndex = '1000';
    
    // Menu aggiornato con la voce "Risorse"
    let menuHTML = `
      <a href="grammatica.html" class="dropdown-item" style="display:block;padding:10px 32px;cursor:pointer;text-decoration:none;color:#222;">Regole di grammatica</a>
      <a href="risorse.html" class="dropdown-item" style="display:block;padding:10px 32px;cursor:pointer;text-decoration:none;color:#222;">Risorse</a>
      <a href="lingua.html" class="dropdown-item" style="display:block;padding:10px 32px;cursor:pointer;text-decoration:none;color:#222;">Lingua dell’interfaccia</a>
      <a href="chisiamo.html" class="dropdown-item" style="display:block;padding:10px 32px;cursor:pointer;text-decoration:none;color:#222;">Chi siamo?</a>
      <a href="supporto.html" class="dropdown-item" style="display:block;padding:10px 32px;cursor:pointer;text-decoration:none;color:#222;">Supporto</a>
    `;
    if (isLoggedIn()) {
      menuHTML += `<a href="#" id="logout-link" class="dropdown-item" style="display:block;padding:10px 32px;cursor:pointer;text-decoration:none;color:#222;">Logout</a>`;
    }
    menu.innerHTML = menuHTML;
    
    menu.innerHTML = menuHTML;
    
    document.body.appendChild(menu);
    
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });
    
    document.addEventListener('click', function (e) {
      if (menu.style.display === 'block' && !menu.contains(e.target) && e.target !== hamburger) {
        menu.style.display = 'none';
      }
    });

    // Logout
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
      logoutLink.addEventListener('click', function () {
        setLoggedIn(false);
        localStorage.removeItem('username');
        window.location.reload();
      });
    }
  }

  const trophyBtn = document.getElementById('trophy');
  const userBtn = document.getElementById('user');
  const backBtn = document.getElementById('back-btn');

  if (isLoggedIn()) {
    if (userBtn) {
      userBtn.style.display = 'none';
    }
    const headerRight = document.querySelector('.header-right');
    if (headerRight) {
      // Crea il messaggio di benvenuto
      const welcomeMsg = document.createElement('div');
      welcomeMsg.id = 'welcome-msg';
      welcomeMsg.textContent = `Benvenuto, ${getUsername()}`;
      welcomeMsg.style.fontSize = '0.9rem';
      welcomeMsg.style.color = '#fff';
      welcomeMsg.style.fontWeight = '500';
      welcomeMsg.style.cursor = 'pointer';
      welcomeMsg.style.position = 'relative';
      headerRight.appendChild(welcomeMsg);

      // Crea il menu a tendina logout
      const logoutMenu = document.createElement('div');
      logoutMenu.id = 'logout-menu';
      logoutMenu.style.display = 'none';
      logoutMenu.style.position = 'absolute';
      logoutMenu.style.top = '120%';
      logoutMenu.style.right = '0';
      logoutMenu.style.background = '#fff';
      logoutMenu.style.color = '#222';
      logoutMenu.style.border = '1px solid #e6edf3';
      logoutMenu.style.borderRadius = '8px';
      logoutMenu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      logoutMenu.style.padding = '8px 0';
      logoutMenu.style.minWidth = '120px';
      logoutMenu.style.zIndex = '1000';
      logoutMenu.innerHTML = `<div id="logout-btn" style="padding:8px 20px;cursor:pointer;text-align:left;">Logout</div>`;
      welcomeMsg.appendChild(logoutMenu);

      welcomeMsg.addEventListener('click', function (e) {
        e.stopPropagation();
        logoutMenu.style.display = (logoutMenu.style.display === 'block') ? 'none' : 'block';
      });
      document.addEventListener('click', function (e) {
        if (logoutMenu.style.display === 'block' && !logoutMenu.contains(e.target) && e.target !== welcomeMsg) {
          logoutMenu.style.display = 'none';
        }
      });
      document.getElementById('logout-btn').addEventListener('click', function () {
        setLoggedIn(false);
        localStorage.removeItem('username');
        window.location.reload();
      });
    }
  } else {
    if (userBtn) {
      userBtn.style.display = '';
      userBtn.addEventListener('click', function () {
        window.location.href = 'login.html';
      });
    }
    // Rimuovi eventuale welcome-msg se presente
    const oldWelcome = document.getElementById('welcome-msg');
    if (oldWelcome) oldWelcome.remove();
  }

  if (trophyBtn) {
    trophyBtn.addEventListener('click', function () {
      window.location.href = 'esercizi.html';
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', function () {
      window.location.href = 'index.html';
    });
  }
});
