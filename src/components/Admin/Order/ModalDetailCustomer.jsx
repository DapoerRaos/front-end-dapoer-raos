"use client";

import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";

const ModalDetailCustomer = ({ customerData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMessageCustomer = (telephone, customerName) => {
    window.open(
      `https://wa.me/62${telephone}?text=${encodeURIComponent(
        `Assalamualaikum, Saya ingin konfirmasi pesanan atas nama ${customerName}.`
      )}`
    );
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
        <div className="text-base font-medium text-gray-900">
          <p className="text-sm font-medium">Detail Pelanggan</p>
        </div>
        <button
          onClick={onOpen}
          className="text-sm py-1 px-2 font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition-all"
        >
          Lihat Detail
        </button>
      </div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Detail Pelanggan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="mb-2">
              <Text fontWeight={"semibold"} fontSize={"sm"}>
                Nama:
              </Text>
              <Text fontSize={"sm"}>{customerData.fullname}</Text>
            </div>
            <div className="mb-2">
              <Text fontWeight={"semibold"} fontSize={"sm"}>
                Email:
              </Text>
              <Text fontSize={"sm"}>{customerData.email}</Text>
            </div>
            <div className="mb-2">
              <Text fontWeight={"semibold"} fontSize={"sm"}>
                No HP
              </Text>
              <Text fontSize={"sm"}>{customerData.telephone}</Text>
            </div>
            <div className="mb-2">
              <Text fontWeight={"semibold"} fontSize={"sm"}>
                Alamat
              </Text>
              <Text fontSize={"sm"}>{customerData.address}</Text>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" size={"sm"} mr={3} onClick={onClose}>
              Kembali
            </Button>
            <Button
              colorScheme="blue"
              size={"sm"}
              onClick={() =>
                handleMessageCustomer(
                  customerData.telephone,
                  customerData.fullname
                )
              }
            >
              Hubungi Pelanggan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalDetailCustomer;
