const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getAllUsers, getUserById, updateUser, updateAvatar, userProfile } = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', userProfile);

router.patch(
    '/me',
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required().min(2).max(30),
            about: Joi.string().required().min(2).max(30),
        }),
    }),
    updateUser,
);

router.patch(
    '/me/avatar',
    celebrate({ body: Joi.object().keys({ avatar: Joi.string().required().regex(/https?:\/\/(w{3}.)?[\w-]+\.\S+[^><]/) }) }),
    updateAvatar,
);

router.get(
    '/:userId',
    celebrate({ params: Joi.object().keys({ userId: Joi.string().length(24).hex() }) }),
    getUserById,
);

module.exports = router;
