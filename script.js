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
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <div class="actions">
                    <button onclick="editPost(${index})">Edit</button>
                    <button onclick="deletePost(${index})">Delete</button>
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
            form.querySelector('button[type="submit"]').textContent = 'Add Post';
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