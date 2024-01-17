"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authSelector = exports.setUserList = exports.setUserLoggedIn = exports.setLoggedIn = exports.authReducer = exports.removeSessionThunk = exports.createSessionThunk = exports.createUserThunk = exports.getInitialUserList = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _firebaseInit = require("../../firebaseInit");

var _firestore = require("firebase/firestore");

var _reactToastify = require("react-toastify");

require("react-toastify/dist/ReactToastify.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  userList: [],
  isLoggedIn: false,
  userLoggedIn: null
};
var getInitialUserList = (0, _toolkit.createAsyncThunk)("auth/userList", function (args, thunkAPI) {
  // eslint-disable-next-line no-unused-vars
  var unsub = (0, _firestore.onSnapshot)((0, _firestore.collection)(_firebaseInit.db, "buybusy-redux"), function (snapShot) {
    var users = snapShot.docs.map(function (doc) {
      return _objectSpread({
        id: doc.id
      }, doc.data());
    });
    thunkAPI.dispatch(setUserList(users));
  });
});
exports.getInitialUserList = getInitialUserList;
var createUserThunk = (0, _toolkit.createAsyncThunk)("auth/createUser", function _callee(data, thunkAPI) {
  var _thunkAPI$getState, authReducer, userList, index, docRef;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _thunkAPI$getState = thunkAPI.getState(), authReducer = _thunkAPI$getState.authReducer;
          userList = authReducer.userList;
          index = userList.findIndex(function (user) {
            return user.email === data.email;
          });

          if (!(index !== -1)) {
            _context.next = 6;
            break;
          }

          _reactToastify.toast.error("Email already used!");

          return _context.abrupt("return");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap((0, _firestore.addDoc)((0, _firestore.collection)(_firebaseInit.db, "buybusy-redux"), {
            name: data.name,
            email: data.email,
            password: data.password,
            cart: [],
            orders: []
          }));

        case 8:
          docRef = _context.sent;

          _reactToastify.toast.success("New user Created!");

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.createUserThunk = createUserThunk;
var createSessionThunk = (0, _toolkit.createAsyncThunk)("auth/createSession", function _callee2(data, thunkAPI) {
  var _thunkAPI$getState2, authReducer, userList, index;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _thunkAPI$getState2 = thunkAPI.getState(), authReducer = _thunkAPI$getState2.authReducer;
          userList = authReducer.userList;
          index = userList.findIndex(function (user) {
            return user.email === data.email;
          });

          if (!(index === -1)) {
            _context2.next = 6;
            break;
          }

          _reactToastify.toast.error("Email does not exist!");

          return _context2.abrupt("return", false);

        case 6:
          if (!(userList[index].password === data.password)) {
            _context2.next = 15;
            break;
          }

          _reactToastify.toast.success("Sign In Successfully!");

          thunkAPI.dispatch(setLoggedIn(true));
          thunkAPI.dispatch(setUserLoggedIn(userList[index]));
          window.localStorage.setItem("token", true);
          window.localStorage.setItem("index", JSON.stringify(userList[index]));
          return _context2.abrupt("return", true);

        case 15:
          _reactToastify.toast.error("Wrong UserName/Password!");

          return _context2.abrupt("return", false);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.createSessionThunk = createSessionThunk;
var removeSessionThunk = (0, _toolkit.createAsyncThunk)("auth/removeSession", function () {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("index");
});
exports.removeSessionThunk = removeSessionThunk;
var authSlice = (0, _toolkit.createSlice)({
  name: "authentication",
  initialState: initialState,
  reducers: {
    setUserList: function setUserList(state, action) {
      state.userList = action.payload;
    },
    setLoggedIn: function setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUserLoggedIn: function setUserLoggedIn(state, action) {
      state.userLoggedIn = action.payload;
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(removeSessionThunk.fulfilled, function (state, action) {
      state.isLoggedIn = false;
      state.userLoggedIn = null;

      _reactToastify.toast.success("Sign Out successfully!");
    });
  }
});
var authReducer = authSlice.reducer;
exports.authReducer = authReducer;
var _authSlice$actions = authSlice.actions,
    setLoggedIn = _authSlice$actions.setLoggedIn,
    setUserLoggedIn = _authSlice$actions.setUserLoggedIn,
    setUserList = _authSlice$actions.setUserList;
exports.setUserList = setUserList;
exports.setUserLoggedIn = setUserLoggedIn;
exports.setLoggedIn = setLoggedIn;

var authSelector = function authSelector(state) {
  return state.authReducer;
};

exports.authSelector = authSelector;