fetch("https://api.github.com/repos/prabhjotkaurarora27/gitboard/commits")
  .then(response => response.json())
  .then(data => {
    const commitList = document.getElementById("commits");
    const leaderboard = document.getElementById("leaderboard");

    let contributors = {};

    data.forEach(commit => {
      // Show commits
      const li = document.createElement("li");
      li.textContent = commit.commit.message;
      commitList.appendChild(li);

      // Count commits per person
      const author = commit.commit.author.name;

      if (contributors[author]) {
        contributors[author]++;
      } else {
        contributors[author] = 1;
      }
    });

    // Create leaderboard
    for (let person in contributors) {
      const li = document.createElement("li");
      li.textContent = person + " - " + contributors[person] + " commits";
      leaderboard.appendChild(li);
    }
  });


