/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAddProductMutation } from "../../../../redux/features/products/productsApi";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";

const categories = [
  { label: "Select Category", value: "" },
  { label: "Accessories", value: "accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
];

const colours = [
  { label: "Select Colour", value: "" },
  { label: "Black", value: "black" },
  { label: "Red", value: "red" },
  { label: "Gold", value: "gold" },
  { label: "Blue", value: "blue" },
  { label: "Silver", value: "silver" },
  { label: "Beige", value: "beige" },
  { label: "Green", value: "green" },
];

export default function AddProduct() {
  const [image, setImage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    category: "",
    colour: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [AddProduct, { isLoading, error }] = useAddProductMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.description ||
      !product.colour
    ) {
      alert("Please fill all the required fields");
      return;
    }

    try {
      await AddProduct({ ...product, image, author: user?._id }).unwrap();
      alert("Product added successfully");
      setProduct({
        name: "",
        category: "",
        colour: "",
        price: "",
        description: "",
      });
      setImage("");
      navigate("/shop");
    } catch (error) {
      console.error("Failed to submit product", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Product Name"
          name="name"
          placeholder="Ex: Diamond Earings"
          value={product.name}
          onChange={handleChange}
        />
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        <SelectInput
          label="Colour"
          name="colour"
          value={product.colour}
          onChange={handleChange}
          options={colours}
        />
        <TextInput
          label="Price"
          name="price"
          type="number"
          placeholder="50"
          value={product.price}
          onChange={handleChange}
        />

        <UploadImage
          name="image"
          id="image"
          value={(e) => setImage(e.target.value)}
          placeholder="Image"
          setImage={setImage}
        />
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="add-product-InputCSS"
            value={product.description}
            placeholder="Write a product description"
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <button type="submit" className="add-product-btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
