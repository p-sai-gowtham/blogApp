document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('blog-form');
    const postsContainer = document.getElementById('blog-posts');
    let posts = JSON.parse(localStorage.getItem('blog-posts')) || [];

    function renderPosts() {
        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');
            postElement.innerHTML = `
                <button type="button" class="btn btn-primary my-3" data-bs-toggle="modal" data-bs-target="#exampleModal${index}">
                  Blog ${index + 1}
                </button>
                        
                <div class="modal fade" id="exampleModal${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${post.title}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>${post.content}</p>
                      </div>
                      <div class="modal-footer">
                        <button onclick="editPost(${index})" class="btn btn-secondary" data-bs-dismiss="modal">Edit</button>
                        <button onclick="deletePost(${index})" class="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    function savePosts() {
        localStorage.setItem('blog-posts', JSON.stringify(posts));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const editId = document.getElementById('edit-id').value;

        if (editId) {
            posts[editId] = { title, content };
            document.getElementById('edit-id').value = '';
            form.querySelector('button').textContent = 'Add Post';
        } else {
            posts.push({ title, content });
        }

        savePosts();
        renderPosts();
        form.reset();
    });

    editPost = (index) => {
        const post = posts[index];
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        document.getElementById('edit-id').value = index;
        form.querySelector('button').textContent = 'Update Post';
    };

    deletePost = (index) => {
        posts.splice(index, 1);
        savePosts();
        renderPosts();
    };

    renderPosts();
});