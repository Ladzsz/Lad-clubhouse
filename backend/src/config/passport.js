import { Strategy as LocalStrategy } from "passport-local";
import { pool } from "../model/pool.js";
import bcrypt from "bcryptjs";

//auth logic for passport
export function initialize(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      //comparing email and password in database for login
      async (email, password, done) => {
        try {
          const res = await pool.query("SELECT * FROM users WHERE email = $1", [
            email,
          ]);
          const user = res.rows[0];
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }

          if (!(await bcrypt.compare(password, user.password))) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  // serialize and deserialize user for session management
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = res.rows[0];
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

// middleware to protect routes
export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}
