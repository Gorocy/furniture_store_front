// src/lib/auth/auth.js

import { writable } from 'svelte/store';

let storedToken;
if (typeof window !== 'undefined') {
  storedToken = localStorage.getItem('adminToken');
}

export const adminToken = writable(storedToken);

export async function adminLogin(username, password) {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    const data = await response.json();
    adminToken.set(data.token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminToken', data.token);
    }
    return { success: true, token: data.token };
  } else {
    return { success: false };
  }
}

export function logout() {
  adminToken.set(null);
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
  }
  window.location.href = "/admin";
}
