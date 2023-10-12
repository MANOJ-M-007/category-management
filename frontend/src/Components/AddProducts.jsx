import React, { useState, useEffect } from "react";
import { axiosInstance } from "../Utility/Axios";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Toast from "./Toast";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const AddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [ancestorCategories, setAncestorCategories] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  //Fetch Default Data
  useEffect(() => {
    axiosInstance
      .get("/category/getCategories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //Fetch Selected Subcategory
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    axiosInstance
      .get(`/category/getSubCategory/${categoryId}`)
      .then((response) => {
        setCategories(response.data);
        setSelectedCategoryNames([
          ...selectedCategoryNames,
          categories.find((category) => category._id === categoryId).name,
        ]);
        setAncestorCategories([...ancestorCategories, categoryId]); // Store category ID instead of name
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Product Submit
  const handleProductSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/product/saveProduct", {
        name: productName,
        category: selectedCategory,
        ancestors: ancestorCategories,
        price: productPrice,
      })
      .then((response) => {
        if (response.data.message === "Product created successfully") {
          setToastMessage(
            `Product ${response.data.product.name} Added successfully!`
          );
        }
        setProductName("");
        setProductPrice("");
        setAncestorCategories([]);
        setSelectedCategoryNames([]);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };
  return (
    <Box
      sx={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
      <Typography
        sx={{
          backgroundImage: "linear-gradient(to top, #8B8B8B, #534A85)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "monospace",
          fontWeight: 1000,
          marginBottom: 2,
          fontSize: { xs: "25px", md: "40px" },
        }}
      >
        PRODUCT MANAGEMENT
      </Typography>
      <Box
        sx={{
          marginBottom: 1,
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "95%",
          maxWidth: "600px",
          padding: { xs: 1, sm: 1, md: 3, lg: 4 },
          backgroundColor: "#EBFBFF",
        }}
      >
        <Typography sx={{ fontFamily: "monospace", fontWeight: 1000 }}>
          CHOOSE CATEGORY
        </Typography>
        <form onSubmit={handleProductSubmit}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Select Your Categories</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => handleCategorySelect(e.target.value)}
              label="Select Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ marginBottom: 2, alignItems: "center" }}>
            <Typography sx={{ fontFamily: "monospace", fontWeight: 1000 }}>
              SELECTED CATEGORIES:
            </Typography>
            {selectedCategoryNames.map((name, index) => (
              <Button
                key={index}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#C2ADFF",
                  fontSize: "0.8rem",
                  minWidth: "80px",
                  minHeight: "30px",
                  marginRight: "5px",
                  color: "#000000",
                }}
              >
                {name}
              </Button>
            ))}
          </Box>
          <Typography sx={{ fontFamily: "monospace", fontWeight: 1000 }}>
            ADD PRODUCTS
          </Typography>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              sx={{
                borderBlockColor: "#66D75C",
                backgroundColor: "#CFFFCB",
                color: "#000000",
              }}
              type="submit"
            >
              ADD PRODUCT
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddProducts;
