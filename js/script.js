// Part1: Create global variables
const profileInfo = document.querySelector(".overview"); //step1: Create a variable that targets the class where your profile info will appear
const username = "sheedwebdev"; //step2: Create a variable for your GitHub username

const repoList = document.querySelector(".repo-list"); //step14: Create a variable to target the unordered list with the repo-list class


// Part2: Create an asynchronous function for retrieving, parsing, and making use of the user info
const gitUserInfo = async function () { //step3: Create an asynchronous function expression
    const userInfo = await fetch(`https://api.github.com/users/${username}`); //step4: Create a variable to fetch user data from the GitHub API
    const data = await userInfo.json(); //step5: Interpret the json data into js data
    console.log(data); //step6: Check to see what the parsed data looks like

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
  console.log(repoInfo); //step18: Check to see what the parsed data looks like 

  displayedRepoInfo(repoInfo); //step26: Call the displayedRepoInfo() function from Part5 using the parsed repo data as an argument
};

// gitRepoInfo(); //step19: Call the function in order to see what the repo data looks like in the console


// Part5: Create a function for displaying the retrieved repo info
const displayedRepoInfo = function (repos) {  //step20: Create a function expression using repos as a parameter
  for (const repo of repos) { //step21: Loop through each repo in the array of repos
    const repoItem = document.createElement("li"); //step22: Create a list item for each repo
    repoItem.classList.add("repo"); //step23:  Apply the repo class to each list item 
    repoItem.innerHTML = `<h3>${repo.name}</h3>`; //step24: Use <h3></h3> elements for the repo name and add to each list item
    repoList.append(repoItem); //step25: Add the created list item to the unordered list that targets the repo-list class 
  }
};





