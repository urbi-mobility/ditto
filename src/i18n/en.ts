export const translations = {
  date: {
    formats: {
      time: "%-I:%M %p"
    }
  },
  onboarding1title: "One validation, many registrations",
  onboarding1content: "much money, wow.",
  onboarding2title: "Private and safe",
  onboarding2content: "Meaning, a lock box",
  onboarding3title: "Fast and convenient",
  onboarding3content: "Ciaone",
  startValidationProcess: "I'm ready",
  validationBody:
    "Make sure you have your driving license at hand, you will have to fill in your data.\n\nOnce submitted, we'll verify your data with the Certification Authority and generate your blockchain contract.\n\nThe whole process takes around 5 minutes!",
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
  help_anythingMissingBody: "Send us an email, we won't respond!",
  next: "Next",
  submit: "Submit",
  verifiedDocuments: "Verified Documents",
  blockchainId: "Your identity on the blockchain",
  drivingLicense: "Driving License",
  keystorePassphrase: "Keystore passphrase",
  contract: "Contract",
  support: "Support",
  contactUs: "Contact us",
  deleteData: "Delete all user data",
  beforeStarting: "Before starting",
  personalInformation: "Personal Information",
  firstName: "First name",
  lastName: "Last name",
  phoneNumber: "Phone number",
  birthDate: "Date of birth",
  birthCountry: "Country of birth",
  dl_information: "Driving License",
  dl_number: "Number",
  dl_issueDate: "Issue Date",
  dl_expiryDate: "Expiry Date",
  loading: "Loading...",
  generatingKeystore: "Generating keystore...",
  recoveringKeystore: "Recovering keystore...",
  contactingCA: "Contacting Certification Authority...",
  consentMessage:
    "%{providerName} wants to access your data in order to complete the registration process.\n\nDo you want to allow %{providerName} to access your data?",
  notNow: "Not now",
  allow: "Allow",
  cancel: "Cancel",
  ok: "OK",
  overwriteKeystoreWarningTitle: "Keystore Overwrite",
  overwriteKeystoreWarningText:
    "You already have a keystore on this device. Overwriting it is not recommended.",
  somethingWentWrong: "Something went wrong",
  consentCallbackFailed: "Couldn't open %{providerName}",
  deleteDataTitle: "Really delete?",
  deleteDataText:
    "Deleting your data will make you lose your certification on the blockchain, too. This action CANNOT be undone!\n\nReally delete all of your data?",
  deleteDataConfirm: "Delete",
  deleting: "Deleting...",
  signingData: "Signing data..."
};

export type Locale = typeof translations;

export default translations;
