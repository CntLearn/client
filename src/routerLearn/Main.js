// import React from "react";
// // import { createBrowserRouter, redirect } from "react-router-dom";
// // import ErrorPage from "./ErrorPage";
// // import Contact from "./Contact";
// // import { Root } from "./Root";
// import { SignUp, Login, Profile } from "../components";
// import { getContacts, getMainMenus } from "../services";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// export function loader() {
//   const contacts = getContacts();
//   const mainMenus = getMainMenus();
//   // const contacts = [];
//   return { contacts, mainMenus };
// }

// export function redirectToChats() {
//   // return redirect(`/chats`);
// }

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/users">Users</Link>
//             </li>
//           </ul>
//         </nav>

//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/users">
//             <Users />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }

// const router1 = createBrowserRouter([
//   {
//     path: "/",
//     // element: <div>Hello world!</div>,
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     loader: loader,
//     // if we want to render contact as a child/nest then do like this.
//     children: [
//       {
//         path: "contacts/:contactId",
//         element: <Contact />,
//       },
//       {
//         path: "/profile",
//         element: <Profile />,
//       },
//       {
//         path: "/chats",
//         element: <div>Chats page loads</div>,
//       },
//       {
//         path: "/groups",
//         element: <div>Groups page loads</div>,
//       },
//       {
//         path: "/contacts",
//         element: <div>Contacts page loads</div>,
//       },
//       {
//         path: "/settings",
//         element: <div>Settings page loads</div>,
//       },
//     ],
//   },
//   // doing below will render it to a new page with this route
//   /*  {
//       path: "contacts/:contactId",
//       element: <Contact />,
//     },
//     */

//   {
//     path: "/register",
//     element: <SignUp />,
//   },

//   {
//     path: "/login",
//     element: <Login />,
//   },
// ]);

// const router = App;

// export default router;
