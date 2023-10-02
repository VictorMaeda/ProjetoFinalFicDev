import React, { useEffect } from 'react';
import { useNavigate } from "react-router";
import { api } from "./api";

export async function registerService(usuario) {
  await api.post('/auth/register', {
    "login": usuario.login,
    "email": usuario.email,
    "senha": usuario.senha
  });
}

export async function loginService(email, senha) {
  try {
    const response = await api.post('/auth/login', {
      "email": email,
      "senha": senha,
    });

    sessionStorage.setItem('token', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
}




export async function sessionValidate() {
  const navigate = useNavigate();
  
  try {
    const accessToken = sessionStorage.getItem('token');
    await api.get('/auth/validate', {
      headers: {
        'Authorization': `Bearer ${JSON.parse(accessToken)}`
      }
    });
  } catch (error) {
    navigate("/");
  }
}
