/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

import { getBaseUrl } from "../../../../utils/baseURL";

export default function UploadImage({ name, setImage }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // request to upload a file
  const uploadSingleImage = (base64) => {
    setLoading(true);
    axios
      .post(`${getBaseUrl()}/uploadImage`, { image: base64 })
      .then((res) => {
        const imageUrl = res.data;
        setUrl(imageUrl);
        alert("Image uploaded successfully");
        setImage(imageUrl);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (let i = 0; i < files.length; i++) {
      const base = await convertBase64(files[i]);
      base64s.push(base);
    }
  };

  return (
    <div>
      <label htmlFor={name}>Upload Image</label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={uploadImage}
        className="add-product-InputCSS"
      />
      {loading && (
        <div className="mt-2 text-sm text-blue-600">Product uploading...</div>
      )}
      {url && (
        <div className="mt-2 text-sm text-green-600">
          <p>Image uploaded successfully!</p>
          <img src={url} alt="uploaded-image" />
        </div>
      )}
    </div>
  );
}
