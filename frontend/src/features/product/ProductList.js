import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "./productSlice";
import ProductCard from "./ProductCard";
import { Grid, Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function ProductList() {
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const { productsById, currentPageProducts, totalProducts, isLoading } =
    useSelector((state) => state.product);

  const products = currentPageProducts.map(
    (productId) => productsById[productId]
  );

  useEffect(() => {
    dispatch(getProductList({ page }));
  }, [page, dispatch]);

  return (
    <>
      <Grid container spacing={2} mt={1}>
        {products.map((product) => (
          <Grid key={product._id} item xs={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalProducts ? (
          <LoadingButton
            variant="outlined"
            loading={isLoading}
            sx={{ mt: 2 }}
            onClick={() => setPage((page) => page + 1)}
            disabled={
              Boolean(totalProducts) && products.length >= totalProducts
            }
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6"> No more products</Typography>
        )}
      </Box>
    </>
  );
}

export default ProductList;
