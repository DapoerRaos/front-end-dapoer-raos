"use client";

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
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "@/libs/auth-libs";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleLogin = async (data) => {
    try {
      const response = await loginUser(data);

      const token = response.token;
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "admin") {
        router.push("/admin/dashboard");
      } else if (decodedToken.role === "customer") {
        router.push("/");
      }

      successToast(response.message);
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
    <Box rounded={"xl"} bg={"white"} boxShadow={"xl"} p={8}>
      <Stack spacing={5}>
        <Text align={"center"} fontWeight={"semibold"} fontSize={"2xl"}>
          Masuk
        </Text>
        <form onSubmit={handleSubmit(handleLogin)}>
          <FormControl id="email" isInvalid={!!errors.email}>
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
              fontSize={"sm"}
              borderColor={"gray.300"}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" mb={4} isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
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
                focusBorderColor="#feab3b"
                fontSize={"sm"}
                borderColor={"gray.300"}
                minLength={8}
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
          <Stack spacing={4}>
            <Stack direction={{ base: "column", sm: "row" }} justify={"end"}>
              <Link href="/auth/register">
                <Text
                  _hover={{ cursor: "pointer", color: "#febb5f" }}
                  transition={"all 0.2s"}
                  fontSize={"sm"}
                >
                  Belum Punya Akun?
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
              Masuk
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default LoginForm;
