"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productSelector = exports.reduceTotalAmount = exports.increaseTotalAmount = exports.increaseTotalItem = exports.setCart = exports.decreaseProductQuantity = exports.increaseProductQuantity = exports.setMyOrders = exports.productReducer = exports.purchaseAllThunk = exports.clearCartThunk = exports.removeFromCartThunk = exports.addToCartThunk = exports.decreaseQuantThunk = exports.increaseQuantThunk = exports.getInitialCartOrdersThunk = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _firebaseInit = require("../../firebaseInit");

var _firestore = require("firebase/firestore");

var _reactToastify = require("react-toastify");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDate() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return "".concat(year, "-").concat(month, "-").concat(day);
}

var getInitialCartOrdersThunk = (0, _toolkit.createAsyncThunk)("product/getCartOrders", function (args, thunkAPI) {
  var _thunkAPI$getState = thunkAPI.getState(),
      authReducer = _thunkAPI$getState.authReducer,
      productReducer = _thunkAPI$getState.productReducer;

  var isLoggedIn = authReducer.isLoggedIn,
      userLoggedIn = authReducer.userLoggedIn;

  if (isLoggedIn) {
    // eslint-disable-next-line no-unused-vars
    var unsub = (0, _firestore.onSnapshot)((0, _firestore.doc)(_firebaseInit.db, "buybusy-redux", userLoggedIn.id), function (doc) {
      var data = doc.data();
      thunkAPI.dispatch(setCart(data.cart));
      thunkAPI.dispatch(setMyOrders(data.orders));
    });
    return productReducer.cart;
  }
});
exports.getInitialCartOrdersThunk = getInitialCartOrdersThunk;
var updateCartInDatabase = (0, _toolkit.createAsyncThunk)("product/updateCartInDatabase", function _callee(args, thunkAPI) {
  var _thunkAPI$getState2, authReducer, productReducer, userLoggedIn, userRef;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _thunkAPI$getState2 = thunkAPI.getState(), authReducer = _thunkAPI$getState2.authReducer, productReducer = _thunkAPI$getState2.productReducer;
          userLoggedIn = authReducer.userLoggedIn;
          userRef = (0, _firestore.doc)(_firebaseInit.db, "buybusy-redux", userLoggedIn.id);
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _firestore.updateDoc)(userRef, {
            cart: productReducer.cart
          }));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
var increaseQuantThunk = (0, _toolkit.createAsyncThunk)("product/increaseProductQuantity", function _callee2(product, thunkAPI) {
  var _thunkAPI$getState3, productReducer, index;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _thunkAPI$getState3 = thunkAPI.getState(), productReducer = _thunkAPI$getState3.productReducer;
          index = productReducer.cart.findIndex(function (item) {
            return item.name === product.name;
          });
          thunkAPI.dispatch(increaseProductQuantity(index));
          thunkAPI.dispatch(increaseTotalAmount(product.price));
          thunkAPI.dispatch(updateCartInDatabase());

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.increaseQuantThunk = increaseQuantThunk;
var decreaseQuantThunk = (0, _toolkit.createAsyncThunk)("product/decreaseProductQuantity", function _callee3(product, thunkAPI) {
  var _thunkAPI$getState4, productReducer, index;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _thunkAPI$getState4 = thunkAPI.getState(), productReducer = _thunkAPI$getState4.productReducer;
          index = productReducer.cart.findIndex(function (item) {
            return item.name === product.name;
          });

          if (!(productReducer.cart[index].quantity === 1)) {
            _context3.next = 5;
            break;
          }

          thunkAPI.dispatch(removeFromCartThunk(product));
          return _context3.abrupt("return");

        case 5:
          thunkAPI.dispatch(decreaseProductQuantity(index));
          thunkAPI.dispatch(reduceTotalAmount(productReducer.cart[index].price));
          thunkAPI.dispatch(updateCartInDatabase());

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.decreaseQuantThunk = decreaseQuantThunk;
var addToCartThunk = (0, _toolkit.createAsyncThunk)("product/addToCart", function _callee4(product, thunkAPI) {
  var _thunkAPI$getState5, authReducer, productReducer, isLoggedIn, userLoggedIn, index, userRef;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _thunkAPI$getState5 = thunkAPI.getState(), authReducer = _thunkAPI$getState5.authReducer, productReducer = _thunkAPI$getState5.productReducer;
          isLoggedIn = authReducer.isLoggedIn, userLoggedIn = authReducer.userLoggedIn;

          if (isLoggedIn) {
            _context4.next = 5;
            break;
          }

          _reactToastify.toast.error("Please Login First!");

          return _context4.abrupt("return");

        case 5:
          index = productReducer.cart.findIndex(function (item) {
            return item.name === product.name;
          });

          if (!(index !== -1)) {
            _context4.next = 10;
            break;
          }

          thunkAPI.dispatch(increaseQuantThunk(productReducer.cart[index]));

          _reactToastify.toast.success("Product Increased!");

          return _context4.abrupt("return");

        case 10:
          userRef = (0, _firestore.doc)(_firebaseInit.db, "buybusy-redux", userLoggedIn.id);
          _context4.next = 13;
          return regeneratorRuntime.awrap((0, _firestore.updateDoc)(userRef, {
            cart: (0, _firestore.arrayUnion)(_objectSpread({
              quantity: 1
            }, product))
          }));

        case 13:
          thunkAPI.dispatch(increaseTotalAmount(product.price));
          thunkAPI.dispatch(increaseTotalItem());

          _reactToastify.toast.success("Added in your Cart!");

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.addToCartThunk = addToCartThunk;
var removeFromCartThunk = (0, _toolkit.createAsyncThunk)("product/removeFromCart", function _callee5(product, thunkAPI) {
  var _thunkAPI$getState6, authReducer, userLoggedIn, userRef;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _thunkAPI$getState6 = thunkAPI.getState(), authReducer = _thunkAPI$getState6.authReducer;
          userLoggedIn = authReducer.userLoggedIn;
          userRef = (0, _firestore.doc)(_firebaseInit.db, "buybusy-redux", userLoggedIn.id);
          _context5.next = 5;
          return regeneratorRuntime.awrap((0, _firestore.updateDoc)(userRef, {
            cart: (0, _firestore.arrayRemove)(product)
          }));

        case 5:
          return _context5.abrupt("return", product);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.removeFromCartThunk = removeFromCartThunk;
var clearCartThunk = (0, _toolkit.createAsyncThunk)("product/emptyCart", function _callee6(args, thunkAPI) {
  var _thunkAPI$getState7, authReducer, productReducer, userLoggedIn, userRef;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _thunkAPI$getState7 = thunkAPI.getState(), authReducer = _thunkAPI$getState7.authReducer, productReducer = _thunkAPI$getState7.productReducer;
          userLoggedIn = authReducer.userLoggedIn;

          if (!(productReducer.itemInCart === 0)) {
            _context6.next = 5;
            break;
          }

          _reactToastify.toast.error("Nothing is remove from Cart!");

          return _context6.abrupt("return");

        case 5:
          userRef = (0, _firestore.doc)(_firebaseInit.db, "buybusy-redux", userLoggedIn.id);
          _context6.next = 8;
          return regeneratorRuntime.awrap((0, _firestore.updateDoc)(userRef, {
            cart: []
          }));

        case 8:
          _reactToastify.toast.success("Cart is Empty!");

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.clearCartThunk = clearCartThunk;
var purchaseAllThunk = (0, _toolkit.createAsyncThunk)("product/purchaseAllItems", function _callee7(args, thunkAPI) {
  var _thunkAPI$getState8, authReducer, productReducer, userLoggedIn, currentDate, userRef;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _thunkAPI$getState8 = thunkAPI.getState(), authReducer = _thunkAPI$getState8.authReducer, productReducer = _thunkAPI$getState8.productReducer;
          userLoggedIn = authReducer.userLoggedIn;
          currentDate = getDate();
          userRef = (0, _firestore.doc)(_firebaseInit.db, "buybusy-redux", userLoggedIn.id);
          _context7.next = 6;
          return regeneratorRuntime.awrap((0, _firestore.updateDoc)(userRef, {
            orders: (0, _firestore.arrayUnion)({
              date: currentDate,
              list: productReducer.cart,
              amount: productReducer.total
            })
          }));

        case 6:
          thunkAPI.dispatch(clearCartThunk());

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.purchaseAllThunk = purchaseAllThunk;
var productSlice = (0, _toolkit.createSlice)({
  name: "product",
  initialState: {
    cart: [],
    itemInCart: 0,
    myorders: [],
    total: 0
  },
  reducers: {
    setMyOrders: function setMyOrders(state, action) {
      state.myorders = action.payload;
      return;
    },
    increaseProductQuantity: function increaseProductQuantity(state, action) {
      var index = action.payload;
      state.cart.at(index).quantity++;
      return;
    },
    decreaseProductQuantity: function decreaseProductQuantity(state, action) {
      var index = action.payload;
      state.cart.at(index).quantity--;
      return;
    },
    setCart: function setCart(state, action) {
      state.cart = action.payload;
      return;
    },
    increaseTotalItem: function increaseTotalItem(state, action) {
      state.itemInCart++;
      return;
    },
    increaseTotalAmount: function increaseTotalAmount(state, action) {
      state.total += action.payload;
      return;
    },
    reduceTotalAmount: function reduceTotalAmount(state, action) {
      state.total -= action.payload;
      return;
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(getInitialCartOrdersThunk.fulfilled, function (state, action) {
      var cart = action.payload;

      if (cart) {
        var sum = 0,
            len = 0;
        cart.map(function (item) {
          Number(sum += item.price * item.quantity);
          Number(len += item.quantity);
        });
        state.total = sum;
        state.itemInCart = len;
      }
    }).addCase(increaseQuantThunk.fulfilled, function (state, action) {
      state.itemInCart++;
    }).addCase(decreaseQuantThunk.fulfilled, function (state, action) {
      if (state.itemInCart > 1) {
        state.itemInCart--;
      }
    }).addCase(removeFromCartThunk.fulfilled, function (state, action) {
      var product = action.payload;
      state.total -= product.quantity * product.price;
      state.itemInCart -= product.quantity;

      _reactToastify.toast.success("Product removed from cart!");
    }).addCase(clearCartThunk.fulfilled, function (state, action) {
      state.itemInCart = 0;
      state.total = 0;
      state.cart = [];
    });
  }
});
var productReducer = productSlice.reducer;
exports.productReducer = productReducer;
var _productSlice$actions = productSlice.actions,
    setMyOrders = _productSlice$actions.setMyOrders,
    increaseProductQuantity = _productSlice$actions.increaseProductQuantity,
    decreaseProductQuantity = _productSlice$actions.decreaseProductQuantity,
    setCart = _productSlice$actions.setCart,
    increaseTotalItem = _productSlice$actions.increaseTotalItem,
    increaseTotalAmount = _productSlice$actions.increaseTotalAmount,
    reduceTotalAmount = _productSlice$actions.reduceTotalAmount;
exports.reduceTotalAmount = reduceTotalAmount;
exports.increaseTotalAmount = increaseTotalAmount;
exports.increaseTotalItem = increaseTotalItem;
exports.setCart = setCart;
exports.decreaseProductQuantity = decreaseProductQuantity;
exports.increaseProductQuantity = increaseProductQuantity;
exports.setMyOrders = setMyOrders;

var productSelector = function productSelector(state) {
  return state.productReducer;
};

exports.productSelector = productSelector;