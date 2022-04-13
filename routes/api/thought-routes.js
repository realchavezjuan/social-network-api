const router = require('express').Router();
const { 
    addThought,
    removeThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
.route('/:userId/:thoughtId')
.delete(removeThought)
.put(addReaction)

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction);


module.exports = router;