function attachEvents() {
  document.getElementById("btnLoadPosts").addEventListener("click", loadPosts);
  document.getElementById("btnViewPost").addEventListener("click", viewPost);
}

async function loadPosts(e) {
  const url = "http://localhost:3030/jsonstore/blog/posts";

  const response = await fetch(url);

  const data = await response.json();

  document.getElementById("posts").innerHTML = "";

  Object.entries(data).forEach(([key, value]) => {
    const optionElem = document.createElement("option");
    optionElem.value = key;
    optionElem.textContent = value.title;
    document.getElementById("posts").appendChild(optionElem);
  });
}

async function viewPost(e) {
  let postId = "";
  document.querySelectorAll("option").forEach((o) => {
    if (o.selected) {
      postId = o.value;
    }
  });
  const postUrl = `http://localhost:3030/jsonstore/blog/posts/${postId}`;

  const postResponse = await fetch(postUrl);

  const postData = await postResponse.json();

  document.getElementById("post-title").textContent = postData.title;
  document.getElementById("post-body").textContent = postData.body;

  const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";
  const commentsResponse = await fetch(commentsUrl);
  const commentsData = await commentsResponse.json();

  const filteredCommends = Object.values(commentsData).filter(
    (x) => x.postId === postId
  );

  document.getElementById("post-comments").innerHTML = "";

  filteredCommends.forEach((c) => {
    const liElem = document.createElement("li");
    liElem.textContent = c.text;
    liElem.id = c.id;
    document.getElementById("post-comments").appendChild(liElem);
  });
}
attachEvents();

function attachEvents() {
  const [postBtn, posts, viewBtn, comments] = [
    "#btnLoadPosts",
    "#posts",
    "#btnViewPost",
    "#post-comments",
  ].map((sel) => document.querySelector(sel));
  postBtn.addEventListener("click", onPost);
  viewBtn.addEventListener("click", onView);
  let postBody = "";
  async function onPost(e) {
    const response = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
    const data = await response.json();
    posts.innerHTML = "";
    Object.entries(data).forEach(([key, value]) => {
      let optionElement = document.createElement("option");
      optionElement.value = key;
      optionElement.textContent = value.title;
      posts.appendChild(optionElement);
      postBody = value.body;
    });
  }
  async function onView(e) {
    let select = [...posts.children].find((x) => x.selected == true);
    const [res, comment] = await Promise.all([
      fetch(`http://localhost:3030/jsonstore/blog/posts/${select.value}`),
      fetch(`http://localhost:3030/jsonstore/blog/comments`),
    ]);
    const data = await res.json();
    comments.innerHTML = "";
    document.getElementById("post-title").textContent =
      posts.options[posts.selectedIndex].text;
    document.getElementById("post-body").textContent = postBody;
    const dataComments = await comment.json();

    Object.values(dataComments).forEach((el) => {
      if (data.id == el.postId) {
        let li = document.createElement("li");
        li.textContent = el.text;
        li.id = el.id;
        comments.appendChild(li);
      }
    });
  }
}
attachEvents();
