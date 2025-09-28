// Quotes array
const quotes = [
  {
    text: "A ship in a harbour is safe but that is not what ships are built for.",
    author: "John A. Shedd",
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House",
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Alan Kay",
  },
  {
    text: "You always need to be working on something, it could be an idea or code.",
    author: "Anonymous",
  },
  {
    text: "The only way to learn a new programming language is by writing programs in it.",
    author: "Dennis Ritchie",
  },
  {
    text: "Good code is its own best documentation.",
    author: "Steve McConnell",
  },
  {
    text: "The problem is not the problem. The problem is your attitude about the problem.",
    author: "Anonymous",
  },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  {
    text: "It’s not a bug, it’s an undocumented feature.",
    author: "Anonymous",
  },
  { text: "Programmers are the poets of our time.", author: "Anonymous" },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
];
const greeting = ref("");
const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];
// Greeting based on time of day
const updateGreeting = () => {
  const hours = new Date().getHours();
  greeting.value =
    hours >= 5 && hours < 18
      ? "☀️ Have a nice day!"
      : hours >= 18 && hours <= 20
        ? "✨ Nice evening!"
        : "✨ Have a good one!";
};

export const useIntroFunctions = () => {
  return {
    getRandomQuote,
    updateGreeting,
    greeting,
  };
};
