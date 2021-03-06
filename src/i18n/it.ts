import { Locale } from "./en";

export const translations: Locale = {
  date: {
    formats: {
      time: "%-H:%M"
    }
  },
  onboarding1title: "Una validazione, molte registrazioni",
  onboarding1content: "Uno per tutti, tutti per uno",
  onboarding2title: "Privato e sicuro",
  onboarding2content: "Sì.",
  onboarding3title: "Veloce e conveniente",
  onboarding3content: "Ciaone",
  startValidationProcess: "Inizia",
  validationBody:
    "Assicurati di avere la tua patente di guida a portata di mano, dovrai inserire i tuoi dati.\n\nUna volta completato l'inserimento dei dati nel form, i dati verranno inviati alla Certification Authority per la verifica e il salvataggio sulla blockchain.\n\nL'intero processo richiede circa 5 minuti!",
  navigation_profile: "Ehi%{name}!",
  navigation_deals: "Offerte",
  navigation_faq: "FAQ",
  home_body:
    "Scopri altri provider di mobilità con i nostri deal esclusivi. Basta un semplice tap, non dovrai autenticarti di nuovo!",
  home_activePromos: "promozioni attive",
  help_howDoesItWorkTitle: "Come funziona?",
  help_howDoesItWorkBody: "Ottima domanda!",
  help_whyBlockchainTitle: "Perché la blockchain?",
  help_whyBlockchainBody:
    "Blockchain blockchain blockchain blockchain, blockchain blockchain, blockchain blockchain blockchain!",
  help_anythingMissingTitle: "Manca qualcosa?",
  help_anythingMissingBody: "Mandaci un'email, non risponderemo!",
  next: "Avanti",
  submit: "Invia",
  verifiedDocuments: "Documenti verificati",
  blockchainId: "La tua identità sulla blockchain",
  drivingLicense: "Patente di guida",
  keystorePassphrase: "Password del keystore",
  contract: "Contratto",
  support: "Supporto",
  contactUs: "Contattaci",
  deleteData: "Elimina tutti i dati utente",
  beforeStarting: "Prima di iniziare",
  personalInformation: "Dati personali",
  firstName: "Nome",
  lastName: "Cognome",
  phoneNumber: "Numero di telefono",
  birthDate: "Data di nascita",
  birthCountry: "Paese di nascita",
  dl_information: "Patente di guida",
  dl_number: "Numero",
  dl_issueDate: "Rilasciata il",
  dl_expiryDate: "Scade il",
  loading: "Caricamento...",
  generatingKeystore: "Genero keystore...",
  recoveringKeystore: "Carico keystore...",
  contactingCA: "Contatto Certification Authority...",
  consentMessage:
    "%{providerName} vuole accedere ai tuoi dati per completare il processo di registrazione.\n\nVuoi permettere a %{providerName} di accedere ai tuoi dati?",
  notNow: "Non ora",
  allow: "Consenti",
  cancel: "Annulla",
  ok: "OK",
  overwriteKeystoreWarningTitle: "Sovrascrittura Keystore",
  overwriteKeystoreWarningText:
    "Hai già un keystore memorizzato. Non è consigliata la sovrascrittura.",
  somethingWentWrong: "Errore",
  consentCallbackFailed: "Impossibile aprire %{providerName}",
  deleteDataTitle: "Conferma eliminazione",
  deleteDataText:
    "Eliminando i dati non sarà più possibile utilizzare la certificazione salvata nella blockchain. Questa operazione NON può essere cancellata.\n\nEliminare davvero i dati?",
  deleteDataConfirm: "Elimina",
  deleting: "Eliminazione in corso...",
  signingData: "Firma dati in corso..."
};

export default translations;
