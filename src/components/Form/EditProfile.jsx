"use client";

import { editProfile } from "@/libs/customer-libs";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const FormEditProfile = ({ id, customerData, token }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const toast = useToast();

  const handleEditProfile = async (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordMatch(false);
      failedToast("Passwords do not match");
      return;
    }

    try {
      console.log(data);
      const response = await editProfile(token, data);
      successToast(response.message);
      location.reload();
    } catch (err) {
      failedToast(err.response.data.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [id, isSubmitSuccessful, reset]);

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

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <form onSubmit={handleSubmit(handleEditProfile)}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <FormControl
          id="fullname"
          mb={3}
          w={{ base: "100%", md: "66%", lg: "" }}
          isInvalid={!!errors.fullname}
        >
          <FormLabel fontSize={"sm"}>Nama Lengkap</FormLabel>
          <Input
            {...register("fullname")}
            type="text"
            focusBorderColor="#feab3b"
            fontSize={"sm"}
            borderColor={"gray.300"}
            placeholder={customerData.fullname}
            defaultValue={customerData.fullname}
          />
          <FormErrorMessage>
            {errors.fullname && errors.fullname.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="email"
          mb={3}
          w={{ base: "100%", md: "66%", lg: "" }}
          isInvalid={!!errors.email}
        >
          <FormLabel fontSize={"sm"}>Email</FormLabel>
          <Input
            {...register("email")}
            type="text"
            focusBorderColor="#feab3b"
            fontSize={"sm"}
            borderColor={"gray.300"}
            placeholder={customerData.email}
            // defaultValue={customerData.email}
            // disabled
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <FormControl
          id="password"
          mb={3}
          w={{ base: "100%", md: "66%" }}
          isInvalid={!!errors.password}
        >
          <FormLabel fontSize={"sm"}>Password</FormLabel>
          <InputGroup>
            <Input
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password minimal 8 karakter",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              focusBorderColor="#feab3b"
              fontSize={"sm"}
              minLength={8}
              borderColor={"gray.300"}
            />
            <InputRightElement>
              <IconButton
                bg={"transparent"}
                _hover={{ bg: "transparent" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="telephone"
          mb={3}
          w={{ base: "100%", md: "66%" }}
          isInvalid={!!errors.telephone}
        >
          <FormLabel fontSize={"sm"}>Nomor HP</FormLabel>
          <PhoneInput
            className="p-[10px] border border-gray-300 rounded-md focus:border-[#feab3b] text-sm"
            defaultCountry="ID"
            international={false}
            onChange={(value) => setValue("telephone", value)}
            placeholder={customerData.telephone}
            value={customerData.telephone}
          />
          <FormErrorMessage>
            {errors.telephone && errors.telephone.message}
          </FormErrorMessage>
        </FormControl>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <FormControl
          id="confirmPassword"
          mb={3}
          w={{ base: "100%", md: "66%" }}
          isInvalid={!!errors.confirmPassword || !passwordMatch}
        >
          <FormLabel fontSize={"sm"}>Konfirmasi Password</FormLabel>
          <InputGroup>
            <Input
              {...register("confirmPassword")}
              type={showPassword ? "text" : "password"}
              placeholder="Konfirmasi Password"
              focusBorderColor="#feab3b"
              fontSize={"sm"}
              borderColor={"gray.300"}
            />
            <InputRightElement>
              <IconButton
                bg={"transparent"}
                _hover={{ bg: "transparent" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
            {!passwordMatch && "Password tidak cocok"}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="address" mb={3} isInvalid={!!errors.address}>
          <FormLabel fontSize={"sm"}>Alamat</FormLabel>
          <Textarea
            {...register("address")}
            type="text"
            focusBorderColor="#feab3b"
            fontSize={"sm"}
            defaultValue={customerData.address}
            placeholder={customerData.address}
            resize={"none"}
            borderColor={"gray.300"}
          />
          <FormErrorMessage>
            {errors.address && errors.address.message}
          </FormErrorMessage>
        </FormControl>
      </div>

      <Button
        bg={"#feab3b"}
        color={"white"}
        _hover={{
          bg: "#febb5f",
        }}
        transition={"all 0.2s"}
        type="submit"
      >
        Edit Profile
      </Button>
    </form>
  );
};

export default FormEditProfile;
