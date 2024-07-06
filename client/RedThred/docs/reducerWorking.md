1. Providing Access to Reducers via Store and Provider
   In main.jsx:
   You configure the Redux store using configureStore from Redux Toolkit, where you specify the root reducer (reducers) combined using combineReducers.
   The Provider component from react-redux wraps your entire application, providing access to the Redux store to all components nested within it.

2. Importing Action and Dispatching in App.jsx
   In App.jsx:
   You import the getPosts action creator and useDispatch hook from react-redux.
   useDispatch gives you access to the dispatch function, which you use to dispatch actions like getPosts().

3. Dispatching Actions and Reducer Update
   When you dispatch getPosts() in App.jsx, it initiates an asynchronous operation (like an API call) inside the action creator.
   Upon completion, getPosts() dispatches a Redux action (e.g., { type: "FETCH_ALL", payload: data }), which flows through the middleware (if any) and reaches the appropriate reducer (posts reducer in your case).

4. Reducer Update via combineReducers
   The posts reducer handles the dispatched action (FETCH_ALL in this case). It updates the state (i.e., posts array) based on the action's payload (typically new data fetched from an API).

5. Accessing State with useSelector
   To retrieve the updated posts state in any component, you can use the useSelector hook from react-redux. It allows you to select data from the Redux store state based on a selector function.
