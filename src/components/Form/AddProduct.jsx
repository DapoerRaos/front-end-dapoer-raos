"use client";

import { addProduct } from "@/libs/product-libs";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const FormAddProduct = ({ category, token }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const toast = useToast();

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleAddProduct = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image_path", selectedImage);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }
      const response = await addProduct(formData, token);
      successToast(response.message);
      setPreviewImage(null);
    } catch (err) {
      failedToast(err.response.data.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const successToast = (message) => {
    toast({
      title: message,
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  const failedToast = (message) => {
    toast({
      title: message,
      status: "error",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleAddProduct)}>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <FormControl
          id="namaProduk"
          mb={3}
          w={{ base: "100%", md: "66%", lg: "" }}
          isInvalid={!!errors.namaProduk}
        >
          <FormLabel fontSize={"sm"}>Nama Produk</FormLabel>
          <Input
            {...register("name", {
              required: "Nama produk wajib diisi",
            })}
            type="text"
            focusBorderColor="#feab3b"
            fontSize={"sm"}
            borderColor={"gray.300"}
          />
          <FormErrorMessage>
            {errors.namaProduk && errors.namaProduk.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="kategoriProduk"
          mb={3}
          w={{ base: "100%", md: "66%" }}
          isInvalid={!!errors.kategoriProduk}
        >
          <FormLabel fontSize={"sm"}>Category Produk</FormLabel>
          <Select {...register("category_id")} placeholder="Pilih Kategori">
            {category.data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.kategoriProduk && errors.kategoriProduk.message}
          </FormErrorMessage>
        </FormControl>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <FormControl
          id="hargaProduk"
          mb={3}
          w={{ base: "100%", md: "66%" }}
          isInvalid={!!errors.hargaProduk}
        >
          <FormLabel fontSize={"sm"}>Harga Produk</FormLabel>
          <Input
            {...register("price", {
              required: "Nama produk wajib diisi",
            })}
            type="number"
            focusBorderColor="#feab3b"
            fontSize={"sm"}
            borderColor={"gray.300"}
          />
          <FormErrorMessage>
            {errors.hargaProduk && errors.hargaProduk.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="stokProduk"
          mb={3}
          w={{ base: "100%", md: "66%" }}
          isInvalid={!!errors.stokProduk}
        >
          <FormLabel fontSize={"sm"}>Stok Produk</FormLabel>
          <Input
            {...register("stock", {
              required: "Stok produk wajib diisi",
            })}
            type="number"
            focusBorderColor="#feab3b"
            fontSize={"sm"}
            borderColor={"gray.300"}
          />
          <FormErrorMessage>
            {errors.stokProduk && errors.stokProduk.message}
          </FormErrorMessage>
        </FormControl>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <FormControl
          id="image_path"
          mb={3}
          w={{ base: "100%", md: "66%" }}
          isInvalid={!!errors.image}
        >
          <FormLabel fontSize={"sm"}>Gambar</FormLabel>
          <Input
            p={2}
            name="image_path"
            type="file"
            accept="image/*"
            focusBorderColor="#feab3b"
            fontSize={"sm"}
            borderColor={"gray.300"}
            onChange={(e) => {
              const file = e.target.files[0];
              setPreviewImage(URL.createObjectURL(file));
              setSelectedImage(file);
            }}
          />
          {previewImage && (
            <div className="mt-2 p-4 bg-slate-100 flex items-center justify-center">
              <Image w={32} rounded={"lg"} src={previewImage} alt="Preview" />
            </div>
          )}
          <FormErrorMessage>
            {errors.image && errors.image.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="beratProduk"
          mb={3}
          w={{ base: "100%", md: "66%" }}
          isInvalid={!!errors.beratProduk}
        >
          <FormLabel fontSize={"sm"}>Berat Produk (kg)</FormLabel>
          <Input
            {...register("weight", {
              required: "Berat Produk wajib diisi",
            })}
            type="number"
            step={0.01}
            focusBorderColor="#feab3b"
            fontSize={"sm"}
            borderColor={"gray.300"}
          />
          <FormErrorMessage>
            {errors.beratProduk && errors.beratProduk.message}
          </FormErrorMessage>
        </FormControl>
      </div>
      <FormControl
        id="deskripsi"
        mb={3}
        w={{ base: "100%", md: "80%" }}
        isInvalid={!!errors.deskripsi}
      >
        <FormLabel fontSize={"sm"}>Deskripsi</FormLabel>
        <Textarea
          {...register("description", {
            required: "Deskripsi produk wajib diisi",
          })}
          type="text"
          focusBorderColor="#feab3b"
          fontSize={"sm"}
          resize={"none"}
          borderColor={"gray.300"}
        />
        <FormErrorMessage>
          {errors.deskripsi && errors.deskripsi.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        bg={"#feab3b"}
        color={"white"}
        _hover={{
          bg: "#febb5f",
        }}
        transition={"all 0.2s"}
        type="submit"
      >
        Tambah Produk
      </Button>
    </form>
  );
};

export default FormAddProduct;
