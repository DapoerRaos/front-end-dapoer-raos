import { logoutUser } from "@/libs/auth-libs";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { SignOut } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const ButtonLogout = ({ isAdmin }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/auth/login");
    toast({
      title: "Berhasil Logout",
      status: "success",
      duration: 2000,
      position: "top",
    });
  };
  return (
    <Flex
      onClick={onOpen}
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      transition={"all 0.3s"}
      bg={isAdmin ? "#1c2434" : "white"}
      color={isAdmin ? "white" : "#1c2434"}
      _hover={{
        bg: "red.500",
        color: "white",
      }}
    >
      <Icon mr="4" fontSize={20} as={SignOut} />
      <Text fontWeight={"medium"}>Keluar</Text>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems={"center"}>
          <ModalHeader>Apakah anda yakin ingin keluar?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Tekan &quot;Logout&quot; jika ingin keluar</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleLogout} colorScheme={"red"}>
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ButtonLogout;
