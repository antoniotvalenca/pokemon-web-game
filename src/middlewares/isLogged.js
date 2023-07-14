module.exports = () => {
    const jwt = require('jsonwebtoken');
    const User = require('../models/User');

    const auth = async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization) return res.status(401).json({ error: [ 'Usuário não está logado' ]});

        const [, token] = authorization.split(' ');

        try {
            const data = jwt.verify(token, process.env.TOKEN_SECRET);
            const { id, nickname } = data;

            const user = User.findOne({
                where: { id, nickname },
                raw: true
            });

            if (!user) throw 'Invalid Credentials';

            req.user_id = id;
            req.nickname = nickname;

            return next();

        } catch (error) {
            return res.status(401).json({ message: [ 'Token inspirado ou inválido' ]});
        };
    };
    return {
        auth
    };
}