
export const checkAuth = async(req, res, next) => {
    try {
        if (req.session){
            next()
        } else {
            return res.status(400),json({ message: "Unauthorize user" })
        }
    } catch(error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" });
    }
}

export function checkRole(roles = []) {
    try {
        if (typeof roles === 'string'){
            roles = [roles]
        }
        return (req, res, next) => {
            if (!req.session.user) {
                return res.status(401).json({
                    status: 'failed',
                    message: "Unauthorized user."
                })
            }
            const { user } = req.session.user;
            if (roles.length && !roles.includes(user)){
                return res.status(401).json({
                    status: 'failed',
                    message: "Unauthorized user."
                })
            }
            next();
        }
    } catch(err){
        console.log(err);
        res.status(401).json({
            status: 'failed',
            message: "Authentication Failed: Please login."
        })
    }
}

export const Logout = async(req, res) => {
    try {
        req.session.destroy(function() {
            res.clearCookie('connect.sid', { path: '/' }).status(200).json({message: "User loged out"});
        })
    } catch(error) {
        const response = "Server error";
        res.status(500);
        res.send(response);
        console.log(error);
    }    
}
