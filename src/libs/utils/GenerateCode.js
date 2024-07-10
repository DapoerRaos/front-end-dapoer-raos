import { customAlphabet } from "nanoid";

// Define an alphabet consisting of only uppercase and lowercase letters
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoidLetters = customAlphabet(alphabet, 3);

export const generateOrderId = (date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const randomPart = nanoidLetters();
  return `ORD-${year}${month}${day}${hours}${minutes}${seconds}-${randomPart}`;
};

export const generateShippingId = (date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const randomPart = nanoidLetters();
  return `SHI-${year}${month}${day}-${randomPart}`;
};
