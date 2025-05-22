// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const fs = require('fs');

// const app = express();
// // const express = require('express');
// const path = require('path');
// // const app = express();


// if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

// app.use(express.static('public'));
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/blogs', require('./routes/blogs'));

// const startServer = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log(' please check conn .MongoDB connected');

//     app.listen(process.env.PORT, () => {
//       console.log(` please check Server running on port ${process.env.PORT}`);
//     });
//   } catch (err) {
//     console.error(' mongoDB connection error?  ...', err);
//   }
// };

// startServer();

// // const express = require('express');
// // const path = require('path');
// // const app = express();

// // Middleware to parse JSON and URL-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // static files  the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // In-memory array to store blog posts



// let blogs = [];

// // API endpoint to get all blogs
// app.get('/api/blogs', (req, res) => {
//   res.json(blogs);
// });

// // API endpoint to add a new blogs
// app.post('/api/blogs', (req, res) => {
//   const { title, content } = req.body;
//   const newBlog = { id: Date.now(), title, content };
//   blogs.push(newBlog);
//   res.status(201).json(newBlog);
// });

// // API endpoint to update a blogs:
// app.put('/api/blogs/:id', (req, res) => {
//   const blogId = parseInt(req.params.id);
//   const { title, content } = req.body;
//   const blog = blogs.find(b => b.id === blogId);
//   if (blog) {
//     blog.title = title;
//     blog.content = content;
//     res.json(blog);
//   } else {
//     res.status(404).json({ message: 'Blog not found?:' });
//   }
// });

// // API endpoint to delete a blog..................
// app.delete('/api/blogs/:id', (req, res) => {
//   const blogId = parseInt(req.params.id);
//   blogs = blogs.filter(b => b.id !== blogId);
//   res.status(204).send();
// });

// // start the server  in mongos 
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });




//  update code 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Ensure uploads folder exists
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

startServer();
