export default defineEventHandler((event) => {
  // Redirect common Safari request to our existing 180x180 icon in /public
  return sendRedirect(event, "/favicon-180x180.png", 302);
});


