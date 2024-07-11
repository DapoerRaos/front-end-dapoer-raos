"use client";
import { changePassword } from "@/libs/auth-libs";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const EmailConfirmation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChangePassword = async (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordMatch(false);
      failedToast("Passwords tidak sama");
      return;
    }
    try {
      const response = await changePassword(data);
      if (response.status === "Success") {
        router.push("/auth/login");
        successToast(response.message);
      }
    } catch (err) {
      failedToast(err.response.data.message);
      router.refresh();
    }
  };

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
    <Box rounded={"xl"} bg={"white"} boxShadow={"xl"} p={8}>
      <Stack spacing={5}>
        <Text align={"center"} fontWeight={"semibold"} fontSize={"2xl"}>
          Ganti Password
        </Text>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <FormControl id="email" mb={3} isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email tidak valid",
                },
              })}
              type="email"
              focusBorderColor="#feab3b"
              placeholder="Email"
              fontSize={"sm"}
              borderColor={"gray.300"}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" mb={3} isInvalid={!!errors.password}>
            <FormLabel>Password Baru</FormLabel>
            <InputGroup>
              <Input
                {...register("password", {
                  required: "Password wajib diisi",
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
            id="confirmPassword"
            mb={3}
            isInvalid={!!errors.confirmPassword || !passwordMatch}
          >
            <FormLabel>Konfirmasi Password Baru</FormLabel>
            <InputGroup>
              <Input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi Password"
                focusBorderColor="#feab3b"
                fontSize={"sm"}
                borderColor={"gray.300"}
              />
              <InputRightElement>
                <IconButton
                  bg={"transparent"}
                  _hover={{ bg: "transparent" }}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
              {!passwordMatch && "Password tidak cocok"}
            </FormErrorMessage>
          </FormControl>
          <Stack spacing={4} mt={4}>
            <Button
              bg={"#feab3b"}
              color={"white"}
              _hover={{
                bg: "#febb5f",
              }}
              transition={"all 0.2s"}
              type="submit"
            >
              Konfirmasi
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default EmailConfirmation;
