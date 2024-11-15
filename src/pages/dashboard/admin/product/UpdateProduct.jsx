import { useParams, useNavigate } from "react-router-dom";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "../../../../redux/features/products/productsApi";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
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

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: "",
    colour: "",
  });

  const {
    data: productData,
    isLoading: isProductLoading,
    error: fetchError,
    refetch,
  } = useFetchProductByIdQuery(id);

  const [newImage, setNewImage] = useState(null);

  const [updateProduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      setProduct({
        name: productData.product.name || "",
        category: productData.product.category || "",
        description: productData.product.description || "",
        price: productData.product.price || "",
        image: productData.product.image || "",
        colour: productData.product.colour || "",
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      image: newImage ? newImage : product.image,
      author: user?._id,
    };

    try {
      await updateProduct({ id, ...updatedProduct }).unwrap();
      alert("Product updated successfully");
      await refetch();
      navigate("/dashboard/manage-products");
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  if (isProductLoading) {
    return <div className="text-center">Loading product information...</div>;
  }

  if (fetchError) {
    return <div className="text-center text-red-500">Error fetching product data: {fetchError.message}</div>;
  }

  if (updateError) {
    return <div className="text-center text-red-500">Error updating product: {updateError.message}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Product Name"
          name="name"
          placeholder="Product Name"
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
          value={newImage || product.image}
          placeholder="Image"
          setImage={handleImageChange}
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
            {isUpdating ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;