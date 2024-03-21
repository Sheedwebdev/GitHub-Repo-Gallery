// Part1: Create global variables
const profileInfo = document.querySelector(".overview"); //step1: Create a variable that targets the class where your profile info will appear
let username = "sheedwebdev"; //step2: Create a variable for your GitHub username

// Part2: Create an asynchronous function for retrieving, parsing, and making use of data
const gitUserInfo = async function () { //step3: Create an asynchronous function expression
    const userInfo = await fetch(`https://api.github.com/users/${username}`); //step4: Create a variable to fetch data from the GitHub API
    const data = await userInfo.json(); //step5: Interpret the json data into js data
    console.log(data); //step6: Check to see what the parsed data looks like

    displayedUserInfo(data); //step13: Call the displayedUserInfo() function from the
};

gitUserInfo();  //step7: Call the function in order to see what the data looks like in the console

// Part3: Create a function for displaying the retrieved data
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
};









