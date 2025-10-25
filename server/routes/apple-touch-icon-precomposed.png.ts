export default defineEventHandler((event) => {
  // Redirect Safari's legacy precomposed icon to our 180x180 PNG
  return sendRedirect(event, "/favicon-180x180.png", 302);
});
