fetch("https://api.github.com/repos/prabhjotkaurarora27/gitboard/commits")
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById("commits");

    data.forEach(commit => {
      const li = document.createElement("li");
      li.textContent = commit.commit.message;
      list.appendChild(li);
    });
  });


