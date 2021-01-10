import * as React from "react";
// import { render } from "react-dom";
// import {
//   createStore,
//   combineReducers,
//   applyMiddleware,
//   Store,
//   Dispatch
// } from "redux";
// import { Provider, useSelector, useDispatch } from "react-redux";
// import thunk from "redux-thunk";

// import "./styles.css";

// function wait(ms: number): Promise<void> {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// type Person = {
//   id: number;
//   name: string;
// };
// type AppState = {
//   people: Person[];
// };

// type AddPersonAction = {
//   readonly type: "AddPerson";
//   readonly payload: string;
// };
// const addPerson = (personName: string) => async (
//   dispatch: Dispatch<AddPersonAction>
// ) => {
//   await wait(200);
//   dispatch({
//     type: "AddPerson",
//     payload: personName
//   } as const);
// };

// type RemovePersonAction = {
//   readonly type: "RemovePerson";
//   readonly payload: number;
// };
// const removePerson = (id: number) => async (
//   dispatch: Dispatch<RemovePersonAction>
// ) => {
//   await wait(200);
//   dispatch({
//     type: "RemovePerson",
//     payload: id
//   } as const);
// };

// type Actions = AddPersonAction | RemovePersonAction;

// function peopleReducer(state: Person[] = [], action: Actions) {
//   switch (action.type) {
//     case "AddPerson":
//       return state.concat({ id: state.length + 1, name: action.payload });
//     case "RemovePerson":
//       return state.filter(person => person.id !== action.payload);
//     default:
//       neverReached(action);
//   }
//   return state;
// }

// function neverReached(never: never) {}

// const rootReducer = combineReducers<AppState>({
//   people: peopleReducer
// });

// function configureStore(): Store<AppState> {
//   const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
//   return store;
// }
// const store = configureStore();

// const App = () => (
//   <Provider store={store}>
//     <Page />
//   </Provider>
// );

// const Page = () => {
//   const [newPerson, setNewPerson] = React.useState("");
//   const updateNewPerson = () => (e: React.ChangeEvent<HTMLInputElement>) =>
//     setNewPerson(e.currentTarget.value);

//   const people: Person[] = useSelector((state: AppState) => state.people);
//   const dispatch = useDispatch();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(addPerson(newPerson));
//     setNewPerson("");
//   };

//   const dispatchNewPerson = (id: number) => () => {
//     dispatch(removePerson(id));
//   };

//   return (
//     <div>
//       <ul>
//         {people.map(person => (
//           <li key={person.id}>
//             <span>{person.name}</span>
//             <button onClick={dispatchNewPerson(person.id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Enter name"
//           value={newPerson}
//           onChange={updateNewPerson()}
//         />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// };

// const rootElement = document.getElementById("root");
// render(<App />, rootElement);
