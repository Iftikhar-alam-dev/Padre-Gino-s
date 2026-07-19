const App = () => {
    return React.createElement( 
        "div",
        {},
        React.createElement("h1", {}, " Padre Gino's"),
        React.createElement("h2", {}, "Best pizza in town!"),
        React.createElement("button", {}, "Order Now"),
    )
     
};
const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(React.createElement(App));