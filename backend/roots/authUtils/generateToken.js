import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = async (userId, res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "2h"
    })
    res.cookie("jwt", token, {
        maxAge: 1 * 60 * 60 * 1000, //1h in ms format
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie;