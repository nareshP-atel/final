const router = require('express').Router();
const Post = require('../../../models/Post');
const auth = require('../../../middleware/auth');

// Get all posts with pagination and filtering
router.get('/posts', auth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const tag = req.query.tag;

        // Build query
        let query = {};
        if (tag) {
            query.tags = tag;
        }

        // Get posts with pagination and populate author details
        const posts = await Post.find(query)
            .populate('author', 'username avatar')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        // Get total count for pagination
        const totalPosts = await Post.countDocuments(query);

        console.log(`Fetched ${posts.length} posts out of ${totalPosts}`);

        res.json({
            success: true,
            posts,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts,
                hasMore: skip + posts.length < totalPosts
            }
        });
    } catch (error) {
        console.error('Get posts error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch posts'
        });
    }
});

// Create a new post
router.post('/posts', auth, async (req, res) => {
    try {
        console.log('Creating post with data:', req.body);
        console.log('User ID:', req.user.userId);

        const { title, content, tags } = req.body;

        // Validate required fields
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title and content are required'
            });
        }

        const post = new Post({
            author: req.user.userId,
            title: title.trim(),
            content: content.trim(),
            tags: tags ? tags.filter(tag => tag.trim()) : []
        });

        await post.save();
        await post.populate('author', 'username');

        console.log('Post created:', post);

        res.status(201).json({
            success: true,
            post
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create post',
            error: error.message
        });
    }
});

// Like/Unlike a post
router.post('/posts/:id/like', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        const likeIndex = post.likes.indexOf(req.user.userId);
        
        if (likeIndex === -1) {
            post.likes.push(req.user.userId);
        } else {
            post.likes.splice(likeIndex, 1);
        }

        await post.save();

        res.json({
            success: true,
            likes: post.likes
        });
    } catch (error) {
        console.error('Like post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update post likes'
        });
    }
});

// Add comment to a post
router.post('/posts/:id/comments', auth, async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        post.comments.push({
            user: req.user.userId,
            content
        });

        await post.save();
        await post.populate('comments.user', 'username');

        res.status(201).json({
            success: true,
            comments: post.comments
        });
    } catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add comment'
        });
    }
});

module.exports = router;