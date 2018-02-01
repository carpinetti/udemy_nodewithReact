const express = require('express');
const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;

const app = express();

// clientID: 980600566381-a62ar9abe4lim2pvhmlo8dcdt21cphbd.apps.googleusercontent.com
// clientSecred: v_tEc7MhbP182kzsD19gZB5F
passport.use(new GoogleStategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);