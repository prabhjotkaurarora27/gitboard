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

    // Sort leaderboard
    let sorted = Object.entries(contributors).sort((a, b) => b[1] - a[1]);

    // Display leaderboard
    sorted.forEach((entry, index) => {
      const li = document.createElement("li");

      if (index === 0) {
        li.textContent = "🏆 " + entry[0] + " - " + entry[1] + " commits";
      } else {
        li.textContent = entry[0] + " - " + entry[1] + " commits";
      }

      leaderboard.appendChild(li);
    });
  });


