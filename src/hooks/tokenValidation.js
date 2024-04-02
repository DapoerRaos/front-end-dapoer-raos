import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token) {
  const currentTime = Math.floor(Date.now() / 1000);
  return token.exp < currentTime;
}

export function validateToken(tokenCookie) {
  if (tokenCookie) {
    try {
      const decodedAccessToken = jwtDecode(tokenCookie);

      if (decodedAccessToken.id && !isTokenExpired(decodedAccessToken)) {
        return {
          id: decodedAccessToken.id,
          role: decodedAccessToken.role,
        };
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}
