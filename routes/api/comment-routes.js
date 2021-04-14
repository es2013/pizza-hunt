const router = require('express').Router();
const { addComment, removeComment, addReply,removeReply } = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>  //create a put route to handle addNewReply()
router.route('/:pizzaId/:commentId').put(addReply).delete(removeComment)

//new delete route to delete a reply
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);


module.exports = router;
