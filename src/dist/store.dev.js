"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _authReducer = require("./Redux/Reducers/authReducer");

var _productReducer = require("./Redux/Reducers/productReducer");

var store = (0, _toolkit.configureStore)({
  reducer: {
    authReducer: _authReducer.authReducer,
    productReducer: _productReducer.productReducer
  }
});
exports.store = store;