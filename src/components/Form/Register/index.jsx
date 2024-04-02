"use client";

import { registerUser } from "@/libs/auth-libs";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleRegister = async (data) => {
    try {
      const response = await registerUser(data);
      successToast(response.message);
      router.push("/auth/login");
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

  return (
    <Box rounded={"xl"} bg={"white"} boxShadow={"xl"} p={6}>
      <Stack spacing={4}>
        <Text align={"center"} fontWeight={"semibold"} fontSize={"xl"}>
          Daftar
        </Text>
        <form onSubmit={handleSubmit(handleRegister)}>
          <FormControl id="fullname" mb={3} isInvalid={!!errors.fullname}>
            <Input
              {...register("fullname", {
                required: "Nama lengkap wajib diisi",
              })}
              type="text"
              focusBorderColor="#feab3b"
              placeholder="Nama Lengkap"
              fontSize={"sm"}
              borderColor={"gray.300"}
            />
            <FormErrorMessage>
              {errors.fullname && errors.fullname.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="email" mb={3} isInvalid={!!errors.email}>
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
          <FormControl id="telephone" mb={3} isInvalid={!!errors.telephone}>
            <PhoneInput
              className="w-full p-[10px] border border-gray-300 rounded-md focus:border-[#feab3b] text-sm "
              defaultCountry="ID"
              international={false}
              onChange={(value) => setValue("telephone", value)}
              placeholder="No Hp"
            />
          </FormControl>
          <FormErrorMessage>
            {errors.telephone && errors.telephone.message}
          </FormErrorMessage>
          <FormControl id="address" mb={3} isInvalid={!!errors.address}>
            <Textarea
              {...register("address", { required: "Alamat wajib diisi" })}
              type="text"
              focusBorderColor="#feab3b"
              placeholder="Alamat"
              fontSize={"sm"}
              resize={"none"}
              borderColor={"gray.300"}
            />
            <FormErrorMessage>
              {errors.address && errors.address.message}
            </FormErrorMessage>
          </FormControl>
          <Stack spacing={3}>
            <Stack direction={{ base: "column", sm: "row" }} justify={"end"}>
              <Link href="/auth/login">
                <Text
                  _hover={{ cursor: "pointer", color: "#feab3b" }}
                  transition={"all 0.2s"}
                  fontSize={"sm"}
                >
                  Sudah Punya Akun?
                </Text>
              </Link>
            </Stack>
            <Button
              bg={"#feab3b"}
              color={"white"}
              _hover={{
                bg: "#febb5f",
              }}
              transition={"all 0.2s"}
              type="submit"
            >
              Daftar
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
