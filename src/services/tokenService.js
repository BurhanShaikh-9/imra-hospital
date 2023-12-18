import React from 'react'
import Cookies from 'js-cookie';


const TokenService = () => {

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const expirationDate = new Date(Date.now() + oneDayInMilliseconds);
  const cookieAttributes = {
    expires: 7,       // Expires in 1 days
    path: '/',        // Accessible across the entire domain
    secure: false,     // Only sent over HTTPS
    httpOnly: false,   // Accessible only through HTTP
    sameSite: 'strict' // Send cookie only if the request is from the same site
  };


  function saveCookie(token) {
    Cookies.set('userToken_imra', token, cookieAttributes);
  }

  function deleteCookie() {
    document.cookie = "userToken_imra=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log('cookieDeleted');
  }

  function getCookie() {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === 'userToken_imra') {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }


  function saveUserCookie(userId) {
    Cookies.set('userId_imra', userId, cookieAttributes);
  }

  function deleteUserCookie() {
    document.cookie = "userId_imra=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log('cookieUserDeleted');
  }

  function getUserCookie() {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === 'userId_imra') {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }


  return { getUserCookie, saveUserCookie, deleteUserCookie, saveCookie, getCookie, deleteCookie }
}

export default TokenService