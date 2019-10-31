const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth');
const User = require('../models/user');

exports.checkEmail = async(email) => {
  let authCheck = await Auth.findOne({ email: email });
    if (authCheck) {
        throw new Error('Something went wrong. Email is in used!');
    }
    return authCheck;
}

exports.createUser = async(firstName, lastName) => {
  const newUser = new User({
    firstname: firstName,
    lastname: lastName
  });
  let user = await newUser.save();
  if (!user) {
      throw new Error('Something went wrong.Cannot save user collection!');
  }
  return user;
}

exports.createAuth = async(email, password, id) => {
  const salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  const authCredentials = new Auth({
      email: email,
      password: hash,
      userId: id
  });
  let auth = await authCredentials.save();
  if (!auth) {
      throw new Error('Something went wrong.Cannot save auth collection!');
  }
  return auth;
}

exports.register = async(req, res, next) => {
  try {
    /**
     * check for existing email
     */
      this.checkEmail(req.body.email)
      .then((check) => {
        // console.log(check);
        if (!check) {
          /**
           * Set extended entities from poeple to users collection
           */
          this.createUser(req.body.firstname, req.body.lastname)
          .then((user) => {
            /**
            * Set login credentials in auth collection
            */
            this.createAuth(req.body.email, req.body.password, user._id)
            .then((auth) => {
              // console.log(auth);
              res.status(200).json({
                message: 'Registered successfully!'
              });
            })
            .catch(next());
          })
          .catch(next());
        }
      })
      .catch(next());

  } catch (e) {
      res.status(500).json({
          message: e.message
      });
  }
}

exports.comparePassword = async(newPassword, previousPassword) => {
  /**
   * compare password
   */
  let decrypted = await bcrypt.compare(newPassword, previousPassword);
  if (!decrypted) {
      throw new Error('Something went wrong. Incorrect password!');
  }
  return decrypted
}

exports.login = async(req, res, next) => {
  try {

      // this.checkEmail(req.body.email)
      // .then((check) => {
      //   // console.log(check);
      //   if (check) {
      //     this.comparePassword(req.body.password, check.password)
      //     .then((compare) => {
      //       // console.log(compare);
      //       if (compare) {
      //         User.findOne({ _id: check.userId })
      //         .then((user) => {
      //           let token = jwt.sign({
      //             email: check.email,
      //             userId: user._id
      //               },
      //               process.env.JWT_KEY, {}
      //           );
      //           console.log(token);
      //           res.status(200).json({
      //               token: token,
      //               userId: user._id,
      //               userEmail: check.email
      //           });
      //         })
      //         .catch(next());
      //       }
      //     })
      //     .catch(next())
      //   }
      // })
      // .catch(next());
      /**
       * Find email on auth collection
       */
      let auth = await Auth.findOne({ email: req.body.email });
      if (!auth) {
          throw new Error('Something went wrong. Your email is not listed!');
      }
      /**
       * compare password
       */
      let decrypted = await bcrypt.compare(req.body.password, auth.password);
      if (!decrypted) {
          throw new Error('Something went wrong. Incorrect password!');
      }

      let user = await User.findOne({ _id: auth.userId });

      let token = await jwt.sign({
              email: auth.email,
              userId: user._id
          },
          process.env.JWT_KEY, {}
      );

      res.status(200).json({
          token: token,
          userId: user._id,
          userEmail: auth.email
      });
  } catch (error) {
      res.status(500).json({
          message: error.message
      });
  }
}
