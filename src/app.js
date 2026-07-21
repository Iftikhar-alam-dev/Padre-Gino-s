const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};
const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, " Padre Gino's"),
    React.createElement(Pizza, {
      name: "The Pepperoni Pizza",
      description: "some dop pizza ya",
    }),
    React.createElement(Pizza, {
      name: "The American Pizza",
      description: "Frinch fries and hot dog, wtf Itly",
    }),
    React.createElement(Pizza, {
      name: "The Hawaiian Pizza",
      description: "Pineapple and ham, wtf america",
    }),
    React.createElement(Pizza, {
      name: "chicken pizza",
      description: "chiken nuggies on your pizza,wtf UK",
    }),
    React.createElement(Pizza, {
      name: "baked potato pizza",
      description: "unholy potato mash,wtf minnesota",
    }),
  ]);
};
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
