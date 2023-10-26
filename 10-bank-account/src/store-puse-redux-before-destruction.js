// Pure redux
// Just for learning purpose we can use createStore
import { combineReducers, createStore } from "redux";

// As a hook accountReducer you have to create an initialState
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// As a hook accountReducer you have to create an accountReducer function,
// but you have to give the default value for state = initialState
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      // instead throw new Error("unknown action") you have to return state
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// Without action creator function
// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });

// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     amount: 1000,
//     purpose: "Buy a car",
//   },
// });

// store.dispatch({ type: "account/payLoan" });

// console.log(store.getState());

// With action creator function
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, "Buy a cheap car."));
store.dispatch(payLoan());

store.dispatch(createCustomer("Yevhen", "70012UA"));
store.dispatch(updateName("Yevhen Khreptun"));

console.log(store.getState());

// Action creator functions for account
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: amount,
      purpose: purpose,
    },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

// Action creator functions for customer
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
