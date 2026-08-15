import { useEffect, useState , useContext } from "react";
import { createLazyRoute } from "@tanstack/react-router";
import Pizza from "../Pizza";
import Cart from "../cart";
import { cartContext } from "../context";

export const Route = createLazyRoute("/order")({
    component : Order,

  });

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [cart, setCart] = useContext(cartContext);

  const [loading, setLoading] = useState(true);
   
  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({cart}),
    });
    setCart([]);
    setLoading(false);
  }

  let price;
  let selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = Number(selectedPizza.sizes[pizzaSize]);
  }

  async function fetchPizzaData() {
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();

    setPizzaTypes(pizzaJson);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaData();
  }, []);

  return (
    <div className="order-page">

      {/* Create Order */}
      <div className="order">
        <h2>Create Order</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            setCart([
              ...cart,
              {
                pizza: selectedPizza,
                size: pizzaSize,
                price,
              },
            ]);
          }}
        >
          <div className="order-options">
            <label htmlFor="pizza-type">Pizza Type</label>

            <select
              id="pizza-type"
              name="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              {pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>

            <label htmlFor="pizza-size">Pizza Size</label>

            <div className="sizes">
              <span>
                <input
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  checked={pizzaSize === "S"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-s">Small</label>
              </span>

              <span>
                <input
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                  checked={pizzaSize === "M"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>

              <span>
                <input
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                  checked={pizzaSize === "L"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>

            <button type="submit">Add to Cart</button>
          </div>
        </form>
      </div>

      {/* Pizza */}
      <div className="order-pizza">
        {loading ? (
          <h1>Loading pizza...</h1>
        ) : (
          <>
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image}
            />

            <p>{intl.format(price)}</p>
          </>
        )}
      </div>

      {/* Cart */}
      <div className="order-cart">
        {loading ? <h2>LOADING...</h2> : <Cart checkout={checkout} cart={cart} />}
      </div>

    </div>
  );
}