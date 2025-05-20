const validateTask = (req, res, next) => {
    const { title, description } = req.body;

    
    if (!title) {
        return res.status(400).json({
            success: false,
            error: 'Title is required'
        });
    }

    if (title.trim().length < 3) {
        return res.status(400).json({
            success: false,
            error: 'Title must be at least 3 characters long'
        });
    }

    if (title.trim().length > 100) {
        return res.status(400).json({
            success: false,
            error: 'Title cannot exceed 100 characters'
        });
    }

    
    if (description && description.trim().length > 500) {
        return res.status(400).json({
            success: false,
            error: 'Description cannot exceed 500 characters'
        });
    }

  
    req.body.title = title.trim();
    if (description) {
        req.body.description = description.trim();
    }

    next();
};

module.exports = validateTask; 