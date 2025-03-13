const bcrypt = require("bcryptjs");
const pool = require("./pool");

const rootValue = {
    login: async ({ email, password }) => {
        const res = await pool.query("SELECT id, email FROM user_details");
        try {
            const result = await pool.query("SELECT * FROM user_details WHERE email = $1", [email]);
            if (result.rows.length === 0) {
                const user = "UserNotFound"
                const id = null
                return { id,user };
            }

            const userDetails = result.rows[0];
            const isMatch = await bcrypt.compare(password, userDetails.password);
            if (!isMatch) {
                const user = "InvalidCredentials"
                const id = null
                return {id,user}
            }
            const user = userDetails.first_name
            const id = userDetails.id
            return { id, user };
        } catch (err) {
            console.error("Login error:", err);
            const id=null;
            return {id,err};
        }
    },
    register: async ({ first_name, last_name, email, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            await pool.query(
                "INSERT INTO user_details (first_name,last_name, email, password) VALUES ($1, $2, $3,$4)",
                [first_name, last_name, email, hashedPassword]
            );
            return "successful";
        } catch (err) {
            return "emailAlreadyExist";
        }
    }


}
module.exports = rootValue;