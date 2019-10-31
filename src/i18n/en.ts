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
  home_activePromos: "active promos"
};

export type Locale = typeof translations;

export default translations;
