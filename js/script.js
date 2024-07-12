const profileInfo = document.querySelector(".overview"); 
const repoList = document.querySelector(".repo-list"); 
const repos = document.querySelector(".repos"); 
const repoData = document.querySelector(".repo-data"); 
const backToGallery = document.querySelector(".view-repos");  
const filterInput = document.querySelector(".filter-repos");
const username = "sheedwebdev"; 


const gitUserInfo = async function () { 
    const userInfo = await fetch(`https://api.github.com/users/${username}`); 
    const data = await userInfo.json(); 
    displayedUserInfo(data); 
};
gitUserInfo();  


const displayedUserInfo = function (data) { 
  const div = document.createElement("div");  
  div.classList.add("user-info"); 
  div.innerHTML = ` 
      <figure>
        <img alt="user avatar" src=${data.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div> `;
  profileInfo.append(div); 

  gitRepoInfo(); 
};


const gitRepoInfo = async function () { 
  const fetchRepoInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`); //step16: Create a variable to fetch repo data from the GitHub API
  const repoInfo = await fetchRepoInfo.json(); 
  displayedRepoInfo(repoInfo); 
};


const displayedRepoInfo = function (repos) {  
  filterInput.classList.remove("hide"); 
  for (const repo of repos) { 
    const repoItem = document.createElement("li"); 
    repoItem.classList.add("repo"); 
    repoItem.innerHTML = `<h3>${repo.name}</h3>`; 
    repoList.append(repoItem); 
  }
};


repoList.addEventListener("click", function (e) { 
  if (e.target.matches("h3")) { 
    const repoName = e.target.innerText; 
    specificRepoInfo(repoName); 
  }
});


const specificRepoInfo = async function (repoName) { 
  const retrievedInfo =  await fetch(`https://api.github.com/repos/${username}/${repoName}`); 
  const specInfo = await retrievedInfo.json(); 
  const fetchLanguages = await fetch(specInfo.languages_url); 
  const languageData = await fetchLanguages.json();
  const languages = []; 
  for (const language in languageData) { 
    languages.push(language); 
  }
  displayedSpecRepoInfo(specInfo, languages); 
};


const displayedSpecRepoInfo = function (specInfo, languages) { 
  backToGallery.classList.remove("hide"); 
  repoData.innerHTML = ""; 
  repoData.classList.remove("hide"); 
  repos.classList.add("hide");
  const div = document.createElement("div"); 
  div.innerHTML = `<h3>Name: ${specInfo.name}</h3> 
  <p>Description: ${specInfo.description}</p>
  <p>Default Branch: ${specInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${specInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`; 
  repoData.append(div); 
};


backToGallery.addEventListener("click", function () { 
  repos.classList.remove("hide"); 
  repoData.classList.add("hide"); 
  backToGallery.classList.add("hide"); 
});


filterInput.addEventListener("input", function (e) { 
  const searchText = e.target.value; 
  const allRepos = document.querySelectorAll(".repo"); 
  const searchLowerText = searchText.toLowerCase(); 
  for (const repo of allRepos) { 
  const repoLowerText = repo.innerText.toLowerCase(); 
  if (repoLowerText.includes(searchLowerText)) { 
    repo.classList.remove("hide"); 
  } else { 
    repo.classList.add("hide");
  }
}
});    




