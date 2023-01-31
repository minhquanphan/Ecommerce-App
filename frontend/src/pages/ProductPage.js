import { Container, Stack, Alert, Box } from "@mui/material";
import { orderBy } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "../components/form";
import SearchInput from "../components/SearchInput";
import ProductFilter from "../features/product/ProductFilter";
import ProductList from "../features/product/ProductList";
import ProductSearch from "../features/product/ProductSearch";
import ProductSort from "../features/product/ProductSort";

function ProductPage() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filterName, setFilterName] = React.useState("");

  const defaultValues = {
    category: "All",
    priceRange: "",
    sortBy: "featured",
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };
  const { watch, reset } = methods;
  const filters = watch();
  const filterProducts = applyFilter(products, filters);
  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack>
        <FormProvider methods={methods}>
          <ProductFilter resetFilter={reset} />
        </FormProvider>
      </Stack>

      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <SearchInput handleSubmit={handleSubmit} />
            <ProductSort />
          </Stack>
        </FormProvider>

        <ProductList />
      </Stack>
    </Container>
  );
}

function applyFilter(products, filters) {
  const { sortBy } = filters;
  let filteredProducts = products;

  // SORT BY
  if (sortBy === "featured") {
    filteredProducts = orderBy(products, ["sold"], ["desc"]);
  }
  if (sortBy === "newest") {
    filteredProducts = orderBy(products, ["createdAt"], ["desc"]);
  }
  if (sortBy === "priceDesc") {
    filteredProducts = orderBy(products, ["price"], ["desc"]);
  }
  if (sortBy === "priceAsc") {
    filteredProducts = orderBy(products, ["price"], ["asc"]);
  }

  // FILTER PRODUCTS
  if (filters.category !== "All") {
    filteredProducts = products.filter(
      (product) => product.category === filters.category
    );
  }
  if (filters.priceRange) {
    filteredProducts = products.filter((product) => {
      if (filters.priceRange === "below") {
        return product.price < 25;
      }
      if (filters.priceRange === "between") {
        return product.price >= 25 && product.price <= 75;
      }
      return product.price > 75;
    });
  }
  if (filters.searchQuery) {
    filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }
  return filteredProducts;
}

export default ProductPage;
