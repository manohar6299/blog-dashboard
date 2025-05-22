// // sign up page
// const signupForm = document.getElementById('signupForm');
// if (signupForm) {
//   signupForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const formData = new FormData(signupForm);
//     const res = await fetch('/api/auth/signup', { method: 'POST', body: formData });
//     alert(await res.text());
//     if (res.ok) location.href = 'index.html';
//   });
// }

// // login page in html 

// const loginForm = document.getElementById('loginForm');
// if (loginForm) {
//   loginForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const res = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     });
//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('userId', data.userId);
//       location.href = 'dashboard.html';
//     } else {
//       alert(data.message || 'Login failed');
//     }
//   });
// }


// // ------------- manohar code 
// document.addEventListener('DOMContentLoaded', () => {
//   const blogsContainer = document.getElementById('blogs');

//   fetch('/api/blogs')
//     .then(res => res.json())
//     .then(blogs => {
//       blogsContainer.innerHTML = '';
//       blogs.forEach(blog => {
//         const blogDiv = document.createElement('div');
//         blogDiv.innerHTML = `
//           <h2>${blog.title}</h2>
//           <p>${blog.content}</p>
//           <a href="edit-blog.html?id=${blog.id}">Edit</a>
//           <button onclick="deleteBlog(${blog.id})">Delete</button>
//           <hr/>
//         `;
//         blogsContainer.appendChild(blogDiv);
//       });
//     });
// });

// function deleteBlog(id) {
//   fetch(`/api/blogs/${id}`, { method: 'DELETE' })
//     .then(() => {
//       window.location.reload();
//     });
// }




// sign up
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const res = await fetch('/api/auth/signup', { method: 'POST', body: formData });
    alert(await res.text());
    if (res.ok) location.href = 'index.html';
  });
}

// login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Login failed');
    }
  });
}

// dashboard blog list
document.addEventListener('DOMContentLoaded', () => {
  const blogsContainer = document.getElementById('blogs');
  const userId = localStorage.getItem('userId');
  if (!blogsContainer || !userId) return;

  fetch(`/api/blogs/list/${userId}`)
    .then(res => res.json())
    .then(blogs => {
      blogsContainer.innerHTML = '';
      blogs.forEach(blog => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog-post');
        blogDiv.innerHTML = `
          <h3>${blog.title}</h3>
          <p>${blog.description}</p>
          ${blog.image ? `<img src="/uploads/${blog.image}" width="100" />` : ''}
          <a href="edit-blog.html?id=${blog._id}">Edit</a>
          <button onclick="deleteBlog('${blog._id}')">Delete</button>
        `;
        blogsContainer.appendChild(blogDiv);
      });
    });
});

function deleteBlog(id) {
  fetch(`/api/blogs/delete/${id}`, { method: 'DELETE' })
    .then(() => window.location.reload());
}

// add blog form submission
const addBlogForm = document.getElementById('addBlogForm');
if (addBlogForm) {
  addBlogForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addBlogForm);
    const userId = localStorage.getItem('userId');
    formData.append('userId', userId);

    const res = await fetch('/api/blogs/add', {
      method: 'POST',
      body: formData
    });

    const msg = await res.text();
    alert(msg);
    if (res.ok) {
      location.href = 'dashboard.html';
    }
  });
}
