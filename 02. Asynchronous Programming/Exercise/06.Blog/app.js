function attachEvents() {
  document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
  document.getElementById('btnViewPost').addEventListener('click', displayPost);

  
}
attachEvents();

async function displayPost() {

  let titleElement = document.getElementById('post-title');
  let bodyElement = document.getElementById('post-body');
  let ulElement = document.getElementById('post-comments');

  titleElement.textContent = 'Loading...';
  bodyElement.textContent = '';
  ulElement.replaceChildren();

  let selectedId = document.getElementById('posts').value;

  let [post, comments] = await Promise.all([
    getPostById(selectedId),
    getCommentsByPostId(selectedId)
  ]);

  titleElement.textContent = post.title;
  bodyElement.textContent = post.body;

  comments.forEach(c => {
    let liElement = document.createElement('li');
    liElement.textContent = c.text;
    ulElement.appendChild(liElement);
  });
}

async function getAllPosts() {
  let url = 'http://localhost:3030/jsonstore/blog/posts';

  let res = await fetch(url);
  let data = await res.json();

  let selectedElement = document.getElementById('posts');
  selectedElement.replaceChildren();

  Object.values(data).forEach(p => {
    let optionElement = document.createElement('option');
    optionElement.textContent = p.title;
    optionElement.value = p.id;

    selectedElement.appendChild(optionElement)
  });
}

async function getPostById(postId) {
  let url = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

  let res = await fetch(url);
  let data = await res.json();

  return data;
}

async function getCommentsByPostId(postId) {
  let url = 'http://localhost:3030/jsonstore/blog/comments';

  let res = await fetch(url);
  let data = await res.json();

  let comments = Object.values(data).filter(c => c.postId == postId);

  return comments;
}
