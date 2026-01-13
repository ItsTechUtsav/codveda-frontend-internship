const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");
const statusText = document.getElementById("status");

let debounceTimer;

// debounce function
function debounce(callback, delay) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(callback, delay);
}

async function fetchUser(username) {
  if (!username) {
    result.innerHTML = "";
    statusText.innerText = "";
    return;
  }

  statusText.innerText = "Loading...";
  result.innerHTML = "";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();
    displayUser(data);
    statusText.innerText = "";

  } catch (error) {
    statusText.innerText = "";
    result.innerHTML = `<p class="error">User not found. Please try again.</p>`;
  }
}

function displayUser(user) {
  result.innerHTML = `
    <div class="profile">
      <img src="${user.avatar_url}" alt="${user.login}" />
      <div class="profile-info">
        <h3>${user.name || user.login}</h3>
        <p>${user.bio || "No bio available"}</p>
        <a href="${user.html_url}" target="_blank">View GitHub Profile</a>
      </div>
    </div>
  `;
}

// input event with debounce
searchInput.addEventListener("input", () => {
  const username = searchInput.value.trim();

  debounce(() => {
    fetchUser(username);
  }, 500);
});
