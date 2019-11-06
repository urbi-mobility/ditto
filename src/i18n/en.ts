export const translations = {
  date: {
    formats: {
      time: "%-I:%M %p"
    }
  },
  navigation_profile: "Hey%{name}!",
  navigation_deals: "Deals",
  navigation_faq: "FAQ",
  home_body:
    "Unlock other sharing mobility providers with our exclusive deals. Just one tap, you won't need to verify your identity again!",
  home_activePromos: "active promos",
  help_howDoesItWorkTitle: "How does it work?",
  help_howDoesItWorkBody: "Nobody knows, really.",
  help_whyBlockchainTitle: "Why blockchain?",
  help_whyBlockchainBody:
    "Blockchain blockchain blockchain blockchain, blockchain blockchain, blockchain blockchain blockchain!",
  help_anythingMissingTitle: "Anything missing?",
  help_anythingMissingBody: "Send us an email, we won't respond!"
};

export type Locale = typeof translations;

export default translations;
