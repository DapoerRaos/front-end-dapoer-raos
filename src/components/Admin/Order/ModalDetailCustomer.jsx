"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const ModalDetailCustomer = ({ data, customerData }) => {
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
          <p className="text-sm font-medium">Detail Pesanan</p>
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
          <ModalHeader fontSize={"md"}>Detail Pesanan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="mb-2">
              <p className="text-sm font-semibold">
                Nama:{" "}
                <span className="font-normal">{customerData.fullname}</span>
              </p>
            </div>
            <div className="mb-2">
              <p className="text-sm font-semibold">
                Telephone:{" "}
                <span className="font-normal">{customerData.telephone}</span>
              </p>
            </div>
            <div className="mb-2">
              <p className="text-sm font-semibold">
                Metode Pengiriman:{" "}
                <span className="font-normal">{data.Shipping?.type}</span>
              </p>
            </div>
            <div className="mb-2">
              <p className="text-sm font-semibold">
                Status Pengiriman:{" "}
                <span className="font-normal">{data.Shipping?.status}</span>
              </p>
            </div>
            {data.Shipping?.type === "Delivery" && (
              <>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    ID Pengiriman:{" "}
                    <span className="font-normal">{data.Shipping?.id}</span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Kurir Pengiriman:{" "}
                    <span className="font-normal uppercase">
                      {data.Shipping?.courier}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Layanan Pengiriman:{" "}
                    <span className="font-normal">
                      {data.Shipping?.service}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Provinsi Tujuan:{" "}
                    <span className="font-normal">
                      {data.Shipping?.province}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Kota Tujuan:{" "}
                    <span className="font-normal">{data.Shipping?.city}</span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Alamat Tujuan:{" "}
                    <span className="font-normal">
                      {data.Shipping?.address}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Estimasi Waktu Pengiriman:{" "}
                    <span className="font-normal">
                      {data.Shipping?.etd} Hari
                    </span>
                  </p>
                </div>
              </>
            )}
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
