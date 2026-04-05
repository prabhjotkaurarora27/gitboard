function loadData() {
  fetch("https://api.github.com/repos/prabhjotkaurarora27/gitboard/commits")
    .then(response => response.json())
    .then(data => {
      const commitList = document.getElementById("commits");
      const leaderboard = document.getElementById("leaderboard");

      // Total commits
      document.getElementById("total").textContent =
        "Total Commits: " + data.length;

      // Clear old data
      commitList.innerHTML = "";
      leaderboard.innerHTML = "";

      let contributors = {};

      data.forEach(commit => {
        // Commit message
        const li = document.createElement("li");

        const message = commit.commit.message;

        // Commit type tagging
        let tag = "";
        if (message.startsWith("feat")) tag = "🟢 FEATURE";
        else if (message.startsWith("fix")) tag = "🔴 FIX";
        else tag = "⚪ OTHER";

        li.textContent = tag + " - " + message;
        commitList.appendChild(li);

        // Count contributors
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

        li.textContent = entry[0] + " - " + entry[1] + " commits";

        // Highlight winner
        if (index === 0) {
          li.textContent = "🏆 " + li.textContent;
          li.style.background = "#16a34a";
          li.style.fontWeight = "bold";
        }

        leaderboard.appendChild(li);
      });
    });
}

// Run first time
loadData();

// Auto refresh every 10 seconds
setInterval(loadData, 10000);

