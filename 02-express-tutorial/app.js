
const express = require("express");
const app = express();
const PORT = 3000;
const { products } = require("./data");
app.use(express.static("./public"));
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
};

app.use(logger);
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});
app.get("/api/v1/query", (req, res) => {
  let { search, limit, maxPrice, regex } = req.query;
  let filteredProducts = [...products];


  
  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  if (maxPrice) {
    const price = parseFloat(maxPrice);
    filteredProducts = filteredProducts.filter((product) => product.price < price);
  }

  
  if (regex) {
    const pattern = new RegExp(regex, "i");
    filteredProducts = filteredProducts.filter((product) => pattern.test(product.name));
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number(limit));
  }
  if (filteredProducts.length < 1) {
    return res.status(200).json({ message: "No products match your criteria" });
  }

  res.status(200).json(filteredProducts);
});