import React, { useEffect, useState } from "react";
import { axiosInstance } from "../Utility/Axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";

const ListProducts = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/list/getRootCategories");
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchData();
  }, []);

  const fetchSubcategories = async (parentId) => {
    try {
      const response = await axiosInstance.get(
        `/list/getSubcategories/${parentId}`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
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
      {categories.map((category) => (
        <Box
          key={category._id}
          sx={{
            backgroundColor: "#EBFBFF",
            marginBottom: 4,
            borderRadius: 2,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "95%",
            maxWidth: "600px",
            padding: { xs: 1, sm: 2, md: 3, lg: 5 },
          }}
        >
          <Typography sx={{ fontFamily: "monospace", fontWeight: 1000 }}>
            CATEGORIES:
          </Typography>
          <Button
            variant="outline"
            sx={{
              marginLeft: "18px",
              bgcolor: "#C2ADFF",
              fontSize: "0.5rem",
              minWidth: "80px",
              minHeight: "30px",
              marginRight: "5px",
              color: "#000000",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ marginRight: 1, fontSize: "0.8rem" }}
            >
              {category.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ({category.numberOfProducts})
            </Typography>
          </Button>
          <Typography sx={{ fontFamily: "monospace", fontWeight: 1000 }}>
            SUB CATEGORIES:
          </Typography>
          <List
            sx={{
              marginBottom: 2,
              display: "flex",
              flexDirection: { xs: "column", md: "column", lg: "row" },
              justifyContent: "flex-start",
            }}
          >
            {category.subcategories.map((subcategory) => (
              <ListItem
                sx={{
                  marginRight: 1, 
                }}
                key={subcategory._id}
              >
                <Button
                  sx={{
                    bgcolor: "#C2ADFF",
                    fontSize: "0.8rem",
                    minWidth: "80px",
                    minHeight: "30px",
                    marginRight: "5px",
                    color: "#000000",
                  }}
                  variant="outline"
                  onClick={() => fetchSubcategories(subcategory._id)}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ marginRight: 1, fontSize: "0.8rem" }}
                  >
                    {subcategory.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ({subcategory.numberOfProducts})
                  </Typography>
                </Button>
              </ListItem>
            ))}
          </List>
          <Typography sx={{ fontFamily: "monospace", fontWeight: 1000 }}>
            PRODUCTS:
          </Typography>
          <List>
            {category.products.map((product) => (
              <Card
                key={product._id}
                sx={{
                  minWidth: 275,
                  marginBottom: 2,
                  background:
                    "linear-gradient(to right bottom, #C2DCFE, #9BC5FD)",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Price: {product.price}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default ListProducts;
