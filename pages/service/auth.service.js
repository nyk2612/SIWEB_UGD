import users from "./data/users"; // ubah nama import jadi jamak (lebih deskriptif)
export const login = (email, password) => {
  const matchedUsers = users.filter(u => u.email === email && u.password === password);
  console.log(matchedUsers);
  if (matchedUsers.length > 0) {
    const token = `mock-token-${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('token', token);
    const userDataWithoutPassword = { ...matchedUsers[0] };
    delete userDataWithoutPassword.password;
    localStorage.setItem('user', JSON.stringify(userDataWithoutPassword));
    return { success: true, message: 'Login berhasil', data: userDataWithoutPassword };
  } else {
    return { success: false, message: 'email atau password salah' };
  }
}

export function isAuthenticated() {
  // if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
}
