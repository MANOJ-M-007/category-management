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

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  //Fetch Default Category
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

  //Fetch Selected Category
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Submit New SubCategory
  const handleCategorySubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/category/saveCategory", {
        name: categoryName,
        parentCategoryId: selectedCategory || null,
      })
      .then((response) => {
        console.log(response.data);
        if (response.statusText === "Created") {
          setToastMessage(
            `Category ${response.data.name} created successfully!`
          );
        }
        setSelectedCategoryNames([]);
        setCategoryName("");
        axiosInstance
          .get("/category/getCategories")
          .then((response) => {
            setCategories(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error("Error creating category:", error);
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
        CATEGORY MANAGEMENT
      </Typography>
      <Box
        sx={{
          marginBottom: 4,
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "95%",
          maxWidth: "600px",
          padding: { xs: 1, sm: 1, md: 3, lg: 4 },
          backgroundColor: "#EBFBFF",
        }}
      >
        <Typography
          sx={{
            fontFamily: "monospace",
            fontWeight: 1000,
          }}
        >
          CHOOSE CATEGORY
        </Typography>
        <form onSubmit={handleCategorySubmit}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Select Category</InputLabel>
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
          <div style={{ marginBottom: 20 }}>
            <Typography
              sx={{
                fontFamily: "monospace",
                fontWeight: 1000,
              }}
            >
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
          </div>
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 1000,
            }}
          >
            ADD NEW CATEGORY
          </Typography>
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              sx={{ borderBlockColor: "#66D75C", backgroundColor: "#CFFFCB" }}
              type="submit"
            >
              Create Category
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddCategory;
