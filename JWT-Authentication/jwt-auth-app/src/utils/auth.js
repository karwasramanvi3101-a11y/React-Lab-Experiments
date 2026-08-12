// -------------------------------
// MOCK USER DATABASE
// -------------------------------

const users = [
  {
    username: "admin_user",
    password: "admin123",
    role: "Admin"
  },
  {
    username: "editor_user",
    password: "edit123",
    role: "Editor"
  },
  {
    username: "viewer_user",
    password: "view123",
    role: "Viewer"
  }
];


// -------------------------------
// GENERATE MOCK JWT
// -------------------------------

export function generateToken(user) {

  // JWT Header
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  // JWT Payload
  const payload = {
    username: user.username,
    role: user.role,
    iat: Date.now()
  };

  // Encode header
  const encodedHeader = btoa(
    JSON.stringify(header)
  );

  // Encode payload
  const encodedPayload = btoa(
    JSON.stringify(payload)
  );

  // Simulated signature
  const signature = btoa(
    encodedHeader +
    "." +
    encodedPayload +
    ".secret"
  );

  // JWT format:
  // HEADER.PAYLOAD.SIGNATURE

  return (
    encodedHeader +
    "." +
    encodedPayload +
    "." +
    signature
  );
}


// -------------------------------
// LOGIN
// -------------------------------

export function login(username, password) {

  const user = users.find(
    (u) =>
      u.username === username &&
      u.password === password
  );

  // Invalid credentials
  if (!user) {
    return null;
  }

  // Generate JWT
  const token = generateToken(user);

  // Store token in browser
  localStorage.setItem(
    "token",
    token
  );

  return {
    username: user.username,
    role: user.role,
    token: token
  };
}


// -------------------------------
// DECODE JWT
// -------------------------------

export function decodeToken(token) {

  try {

    // JWT:
    // HEADER.PAYLOAD.SIGNATURE

    const payload = token.split(".")[1];

    return JSON.parse(
      atob(payload)
    );

  } catch (error) {

    return null;

  }
}


// -------------------------------
// GET CURRENT USER
// -------------------------------

export function getCurrentUser() {

  const token =
    localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return decodeToken(token);
}


// -------------------------------
// LOGOUT
// -------------------------------

export function logout() {

  localStorage.removeItem("token");

}


// -------------------------------
// CHECK AUTHENTICATION
// -------------------------------

export function isAuthenticated() {

  return (
    localStorage.getItem("token") !== null
  );

}