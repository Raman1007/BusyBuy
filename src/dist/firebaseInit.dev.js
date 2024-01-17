"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _app = require("firebase/app");

var _firestore = require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyA6NWeFm_Uc2FOCnWZIrxnGT0bVV0EsIdQ",
  authDomain: "buybusy-905ff.firebaseapp.com",
  projectId: "buybusy-905ff",
  storageBucket: "buybusy-905ff.appspot.com",
  messagingSenderId: "745463990891",
  appId: "1:745463990891:web:89755bafcd235947477f2e"
};
var app = (0, _app.initializeApp)(firebaseConfig);
var db = (0, _firestore.getFirestore)(app);
exports.db = db;