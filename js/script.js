// Part1: Create global variables
const profileInfo = document.querySelector(".overview"); //step1: Create a variable that targets the class where your profile info will appear
const username = "sheedwebdev"; //step2: Create a variable for your GitHub username

const repoList = document.querySelector(".repo-list"); //step14: Create a variable to target the unordered list with the repo-list class

const repos = document.querySelector(".repos"); //step28: Create a variable to target the section with the repos class
const repoData = document.querySelector(".repo-data"); //step29: Create a variable to target the section with the repo-data class

const backToGallery = document.querySelector(".view-repos"); //step53: Create a variable to target the back to repo gallery button
const filterInput = document.querySelector(".filter-repos");  //step54: Create a variable to target the element used for dynamic searches

// Part2: Create an asynchronous function for retrieving, parsing, and making use of the user info
const gitUserInfo = async function () { //step3: Create an asynchronous function expression
    const userData = await fetch(`https://api.github.com/users/${username}`); //step4: Create a variable to fetch user data from the GitHub API
    const data = await userData.json(); //step5: Interpret the json data into js data
    // console.log(data); //step6: Check to see what the parsed data looks like

    displayedUserInfo(data); //step13: Call the displayedUserInfo() function from the
};

gitUserInfo();  //step7: Call the function in order to see what the user data looks like in the console

// Part3: Create a function for displaying the retrieved user data
const displayedUserInfo = function (data) { //step8: Create a function expression
  const div = document.createElement("div");  //step9: Create a div element to nest within the overview class div
  div.classList.add("user-info"); //step10: Add the user-info class to that created div
  div.innerHTML = ` 
      <figure>
        <img alt="user avatar" src=${data.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div> `; //step11: Add html elements for the displayig the profile img, name, location, and number of public repos
  profileInfo.append(div); //step12: Add the created div to the overview class div

  gitRepoInfo(); //step27: Call the gitRepoInfo() async function from Part4
};

// Part4: Create an asynchronous function for retrieving, parsing, and making use of the repo info
const gitRepoInfo = async function () { //step15: Create an asynchronous function expression
  const fetchRepoInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`); //step16: Create a variable to fetch repo data from the GitHub API
  const repoInfo = await fetchRepoInfo.json(); //step17: Interpret the json data into js data 
  // console.log(repoInfo); //step18: Check to see what the parsed data looks like 

  displayedRepoInfo(repoInfo); //step26: Call the displayedRepoInfo() function from Part5 using the parsed repo data as an argument
};

// gitRepoInfo(); //step19: Call the function in order to see what the repo data looks like in the console


// Part5: Create a function for displaying the retrieved repo info
const displayedRepoInfo = function (repos) {  //step20: Create a function expression using repos as a parameter
  
  filterInput.classList.remove("hide"); //step60: Make the dynamic search input feature appear

  for (const repo of repos) { //step21: Loop through each repo in the array of repos
    const repoItem = document.createElement("li"); //step22: Create a list item for each repo
    repoItem.classList.add("repo"); //step23:  Apply the repo class to each list item 
    repoItem.innerHTML = `<h3>${repo.name}</h3>`; //step24: Use <h3></h3> elements for the repo name and add to each list item
    repoList.append(repoItem); //step25: Add the created list item to the unordered list that targets the repo-list class 
  }
};

// Part6: Add a Click Event
repoList.addEventListener("click", function (e) { //step30: Add a click event to the unordered list of repos
  if (e.target.matches("h3")) { //step31: Write a conditonal statement as to what happens if the user clicks a repo name
    const repoName = e.target.innerText; //step32: Create a variable to target the innerText of the element being targeted
    // console.log(repoName); //step33: Check to see if the even listener is working as expected

    specificRepoInfo(repoName); //step45: Call the specificRepoInfo() function from Part7
  }
});

// Part7: Create a function to retrieve specific repo info
const specificRepoInfo = async function (repoName) { //step34: Write a asynchronous function for retrieving, parsing, and making use of specific repo info
  const retrievedInfo =  await fetch(`https://api.github.com/repos/${username}/${repoName}`); //step35: Retrieve the repo from the github api
  const specInfo = await retrievedInfo.json(); //step36: Parse or interpret the json data into js data
  // console.log(specInfo); //step37: Check to see what the pased data looks like
// Part7a: Create an array of languages
  const fetchLanguages = await fetch(specInfo.languages_url); //step38: Retreive the languages data for the retrieved repo
  const languageData = await fetchLanguages.json(); //step39: Parse or interpret the json data into js data
  console.log(languageData); //step40: Check to see what the parsed data looks like
  const languages = []; //step41: Create a variable for an empty array to push repo languages to
  for (const language in languageData) { //step42: Write a for loop for looping through every key in the object languageData
    languages.push(language); //step43: Push every language in the languageData object to the empty array for languages
  }
  console.log(languages); //step44: Check to see if everything works as expected

  displayedSpecRepoInfo(specInfo, languages); //step52: Display the specific repo info 
};


// Part8: Create a function to display specific repo info
const displayedSpecRepoInfo = function (specInfo, languages) { //step45: Create a function expression for displaying the specific repo info
  backToGallery.classList.remove("hide"); //step59: Make the backToGallery button appear
  repoData.innerHTML = ""; //step46: Clear all the previous html from the repoData section 
  repoData.classList.remove("hide"); //step47: Make the repoData appear
  repos.classList.add("hide"); //step48: Make all the listed repos disappear
  const div = document.createElement("div"); //step49: Create a div element
  //step50: Display the name, description, default branch, languages, and repo url
  div.innerHTML = `<h3>Name: ${specInfo.name}</h3> 
  <p>Description: ${specInfo.description}</p>
  <p>Default Branch: ${specInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${specInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(div); //step51: Add the created div to the repoData section
};

// Part9: Adding a click event to the back button
backToGallery.addEventListener("click", function () { //step55: Create an event listener for the back to gallery button
  repos.classList.remove("hide"); //step56: Make the list of repos appear again
  repoData.classList.add("hide"); //step57: Make the repo data currently being displayed disappear
  backToGallery.classList.add("hide"); //step58: Make the back to gallery button disappear
});


// Part10: Create a dynamic search feature by adding an input event to the search box
filterInput.addEventListener("input", function (e) { //step61: Add an event listener to the input element used for a dynamic search
  const searchText = e.target.value; //step62: Create a variable to capture the value of the search text
  // console.log(searchText);  //step63: Check to see if the search text is being captured
  const allRepos = document.querySelectorAll(".repo"); //step64: Create a variable for selecting the entire section that houses all the repos and search input box
  const searchLowerText = searchText.toLowerCase(); //step65: Create a variable that changes all input values to lower case
  
for (const repo of allRepos) { //step66: Loop through all repos in the list of repos
  const repoLowerText = repo.innerText.toLowerCase(); //step67: Create a variable that changes all repos to lower case
  if (repoLowerText.includes(searchLowerText)) { //step68: Write a conditional statement that states whether the search text includes the repo text
    repo.classList.remove("hide"); //step69: Make that specific repo appear
  } else { //step70: Make sure all other repos are hidden
    repo.classList.add("hide");
  }
}
});    




