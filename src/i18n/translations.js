// Central FR/EN dictionary. Access via the useLang() hook: t('key').
export const translations = {
  // --- Navigation ---
  'nav.home': { en: 'Home', fr: 'Accueil' },
  'nav.about': { en: 'About', fr: 'À propos' },
  'nav.projects': { en: 'Projects', fr: 'Projets' },
  'nav.services': { en: 'Services', fr: 'Services' },
  'nav.blog': { en: 'Blog', fr: 'Blog' },
  'nav.contact': { en: 'Contact', fr: 'Contact' },
  'nav.cta': { en: 'Get in touch', fr: 'Nous contacter' },

  // --- Hero ---
  'hero.badge': {
    en: 'Algerian cybersecurity startup · Est. 2025',
    fr: 'Startup algérienne de cybersécurité · Créée en 2025',
  },
  'hero.title': {
    en: 'Securing the digital future of Algeria',
    fr: "Sécuriser l'avenir numérique de l'Algérie",
  },
  'hero.subtitle': {
    en: 'Yanova Solutions designs and builds its own cybersecurity and networking technologies — from Cerberus Pi to Yanova OS — alongside consulting, secure hosting and IT training.',
    fr: "Yanova Solutions conçoit et développe ses propres technologies de cybersécurité et de réseau — de Cerberus Pi à Yanova OS — aux côtés du conseil, de l'hébergement sécurisé et de la formation IT.",
  },
  'hero.cta1': { en: 'Explore our products', fr: 'Découvrir nos produits' },
  'hero.cta2': { en: 'Talk to an expert', fr: 'Parler à un expert' },
  'hero.stat1': { en: 'In-house products', fr: 'Produits maison' },
  'hero.stat2': { en: 'Founded', fr: 'Fondée' },
  'hero.stat3': { en: 'Field-tested', fr: 'Testé sur le terrain' },
  'hero.stat3v': { en: 'Real networks', fr: 'Réseaux réels' },

  // --- About ---
  'about.eyebrow': { en: 'Who we are', fr: 'Qui sommes-nous' },
  'about.title': {
    en: 'An innovative team specialized in networks & cybersecurity',
    fr: 'Une équipe innovante spécialisée en réseaux & cybersécurité',
  },
  'about.body': {
    en: 'Yanova Solutions is an innovative company specialized in networks and cybersecurity. We offer a wide range of IT services — from strategic consulting to the creation and hosting of websites and applications, as well as IT training for students and professionals. We stand out through the sale of IT & networking equipment and, above all, the development of our own technological solutions such as Cerberus Pi. We are committed to delivering secure, high-performance solutions tailored to our clients.',
    fr: "Yanova Solutions est une entreprise innovante spécialisée dans les réseaux et la cybersécurité. Nous offrons une large gamme de services informatiques — du conseil stratégique à la création et l'hébergement de sites web et d'applications, en passant par la formation IT pour étudiants et professionnels. Nous nous démarquons par la vente d'équipements informatiques et réseaux et, surtout, par l'élaboration de nos propres solutions technologiques telles que Cerberus Pi. Nous nous engageons à fournir des solutions sécurisées, performantes et adaptées aux besoins de nos clients.",
  },
  'about.mission.t': { en: 'Our mission', fr: 'Notre mission' },
  'about.mission.b': {
    en: 'Make robust, enterprise-grade cybersecurity accessible, efficient and affordable for every organization.',
    fr: 'Rendre une cybersécurité robuste et de niveau entreprise accessible, efficace et abordable pour chaque organisation.',
  },
  'about.vision.t': { en: 'Our vision', fr: 'Notre vision' },
  'about.vision.b': {
    en: 'Become a reference in home-grown security technology across Algeria and the wider region.',
    fr: 'Devenir une référence de la technologie de sécurité locale en Algérie et dans toute la région.',
  },
  'about.team.t': { en: 'Founding team', fr: 'Équipe fondatrice' },

  // --- Projects ---
  'projects.eyebrow': { en: 'Our products', fr: 'Nos produits' },
  'projects.title': {
    en: 'Technology we build in-house',
    fr: 'Des technologies que nous développons en interne',
  },
  'projects.subtitle': {
    en: 'Purpose-built cybersecurity and infrastructure products, engineered by the Yanova Solutions team.',
    fr: "Des produits de cybersécurité et d'infrastructure sur mesure, conçus par l'équipe Yanova Solutions.",
  },
  'projects.learn': { en: 'Learn more', fr: 'En savoir plus' },
  'projects.flagship': { en: 'Flagship', fr: 'Produit phare' },

  'proj.cerberus.name': { en: 'Cerberus Pi', fr: 'Cerberus Pi' },
  'proj.cerberus.tag': {
    en: 'Compact IDS / IPS appliance',
    fr: 'Boîtier IDS / IPS compact',
  },
  'proj.cerberus.desc': {
    en: 'A pocket-sized network security appliance that replaces traditional IDS/IPS systems. Real-time IDS analysis, active IPS blocking, priority-coded alerts, and decentralized daily logs on IPFS — field-tested in a real hospital network and recommended by Galattica.',
    fr: "Un boîtier de sécurité réseau format de poche qui remplace les IDS/IPS traditionnels. Analyse IDS en temps réel, blocage IPS actif, alertes à code couleur et journaux quotidiens décentralisés sur IPFS — testé dans un réseau hospitalier réel et recommandé par Galattica.",
  },
  'proj.cerberus.f1': { en: 'IDS & IPS modes', fr: 'Modes IDS & IPS' },
  'proj.cerberus.f2': { en: 'Customizable rules', fr: 'Règles personnalisables' },
  'proj.cerberus.f3': { en: 'IPFS decentralized logs', fr: 'Journaux décentralisés IPFS' },
  'proj.cerberus.f4': { en: 'Intuitive dashboard', fr: 'Tableau de bord intuitif' },

  'proj.yanovaos.name': { en: 'Yanova OS', fr: 'Yanova OS' },
  'proj.yanovaos.tag': {
    en: 'Security-focused operating system',
    fr: "Système d'exploitation axé sécurité",
  },
  'proj.yanovaos.desc': {
    en: 'A hardened, security-first operating system tailored for professionals and network defenders. It bundles curated security tooling with a clean, streamlined workflow so teams can monitor, audit and respond with confidence.',
    fr: "Un système d'exploitation renforcé, pensé sécurité d'abord, taillé pour les professionnels et les défenseurs de réseaux. Il regroupe des outils de sécurité sélectionnés dans un flux de travail épuré pour surveiller, auditer et répondre en toute confiance.",
  },
  'proj.yanovaos.f1': { en: 'Hardened by default', fr: 'Renforcé par défaut' },
  'proj.yanovaos.f2': { en: 'Curated security toolkit', fr: 'Boîte à outils sécurité' },
  'proj.yanovaos.f3': { en: 'Lightweight & fast', fr: 'Léger & rapide' },
  'proj.yanovaos.f4': { en: 'Built for defenders', fr: 'Pensé pour les défenseurs' },

  'proj.reconone.name': { en: 'ReconOne', fr: 'ReconOne' },
  'proj.reconone.tag': {
    en: 'Reconnaissance & attack-surface mapping',
    fr: "Reconnaissance & cartographie de la surface d'attaque",
  },
  'proj.reconone.desc': {
    en: 'An all-in-one reconnaissance platform that maps your external attack surface. Automated asset discovery, exposure detection and clear reporting help security teams find weaknesses before attackers do.',
    fr: "Une plateforme de reconnaissance tout-en-un qui cartographie votre surface d'attaque externe. Découverte automatisée des actifs, détection des expositions et rapports clairs aident les équipes à trouver les failles avant les attaquants.",
  },
  'proj.reconone.f1': { en: 'Automated asset discovery', fr: 'Découverte automatisée des actifs' },
  'proj.reconone.f2': { en: 'Exposure detection', fr: 'Détection des expositions' },
  'proj.reconone.f3': { en: 'Actionable reports', fr: 'Rapports exploitables' },
  'proj.reconone.f4': { en: 'Continuous monitoring', fr: 'Surveillance continue' },

  'proj.nas.name': { en: 'Yanova NAS Server', fr: 'Serveur NAS Yanova' },
  'proj.nas.tag': {
    en: 'Secure network-attached storage',
    fr: 'Stockage réseau sécurisé',
  },
  'proj.nas.desc': {
    en: 'A secure, self-hosted NAS server that keeps your data under your control. Encrypted storage, granular access control and reliable backups give businesses full data sovereignty without depending on foreign cloud providers.',
    fr: "Un serveur NAS sécurisé et auto-hébergé qui garde vos données sous votre contrôle. Stockage chiffré, contrôle d'accès granulaire et sauvegardes fiables offrent aux entreprises une pleine souveraineté des données, sans dépendre de fournisseurs cloud étrangers.",
  },
  'proj.nas.f1': { en: 'Encrypted storage', fr: 'Stockage chiffré' },
  'proj.nas.f2': { en: 'Granular access control', fr: "Contrôle d'accès granulaire" },
  'proj.nas.f3': { en: 'Automated backups', fr: 'Sauvegardes automatisées' },
  'proj.nas.f4': { en: 'Full data sovereignty', fr: 'Souveraineté des données' },

  // --- Services ---
  'services.eyebrow': { en: 'What we do', fr: 'Ce que nous faisons' },
  'services.title': { en: 'Services beyond our products', fr: 'Des services au-delà de nos produits' },
  'services.subtitle': {
    en: 'A full spectrum of IT and security services to support your organization end to end.',
    fr: "Un spectre complet de services IT et sécurité pour accompagner votre organisation de bout en bout.",
  },
  'svc.consulting.t': { en: 'Strategic consulting', fr: 'Conseil stratégique' },
  'svc.consulting.b': {
    en: 'Security audits, network architecture and strategic guidance tailored to your risk profile.',
    fr: "Audits de sécurité, architecture réseau et conseil stratégique adaptés à votre profil de risque.",
  },
  'svc.web.t': { en: 'Web & app hosting', fr: 'Hébergement web & apps' },
  'svc.web.b': {
    en: 'Design, development and secure hosting of websites and applications.',
    fr: "Conception, développement et hébergement sécurisé de sites web et d'applications.",
  },
  'svc.training.t': { en: 'IT training', fr: 'Formation IT' },
  'svc.training.b': {
    en: 'Hands-on cybersecurity and networking training for students and professionals.',
    fr: "Formation pratique en cybersécurité et réseaux pour étudiants et professionnels.",
  },
  'svc.equipment.t': { en: 'Equipment supply', fr: "Vente d'équipements" },
  'svc.equipment.b': {
    en: 'Sourcing and sale of IT and networking equipment from trusted vendors.',
    fr: "Approvisionnement et vente d'équipements informatiques et réseaux de confiance.",
  },
  'svc.soc.t': { en: 'Monitoring & response', fr: 'Surveillance & réponse' },
  'svc.soc.b': {
    en: 'Continuous network monitoring and incident response to keep you protected.',
    fr: "Surveillance continue du réseau et réponse aux incidents pour rester protégé.",
  },
  'svc.custom.t': { en: 'Custom solutions', fr: 'Solutions sur mesure' },
  'svc.custom.b': {
    en: 'Bespoke security and infrastructure solutions engineered around your needs.',
    fr: "Solutions de sécurité et d'infrastructure conçues autour de vos besoins.",
  },

  // --- Blog preview ---
  'blog.eyebrow': { en: 'Insights', fr: 'Actualités' },
  'blog.title': { en: 'From the Yanova blog', fr: 'Depuis le blog Yanova' },
  'blog.subtitle': {
    en: 'Practical cybersecurity insights, product updates and network best practices.',
    fr: "Conseils pratiques en cybersécurité, nouveautés produits et bonnes pratiques réseau.",
  },
  'blog.readall': { en: 'Read all articles', fr: 'Tous les articles' },
  'blog.read': { en: 'Read article', fr: "Lire l'article" },
  'blog.empty': { en: 'No articles published yet. Check back soon.', fr: "Aucun article publié pour l'instant. Revenez bientôt." },
  'blog.back': { en: 'Back to blog', fr: 'Retour au blog' },
  'blog.notfound': { en: 'Article not found.', fr: 'Article introuvable.' },
  'blog.published': { en: 'Published', fr: 'Publié le' },

  // --- Contact ---
  'contact.eyebrow': { en: 'Contact', fr: 'Contact' },
  'contact.title': { en: "Let's secure what matters", fr: "Sécurisons ce qui compte" },
  'contact.subtitle': {
    en: 'Tell us about your project or security challenge. Our team will get back to you shortly.',
    fr: "Parlez-nous de votre projet ou de votre défi de sécurité. Notre équipe vous répondra rapidement.",
  },
  'contact.name': { en: 'Full name', fr: 'Nom complet' },
  'contact.email': { en: 'Email address', fr: 'Adresse email' },
  'contact.subject': { en: 'Subject', fr: 'Sujet' },
  'contact.message': { en: 'Message', fr: 'Message' },
  'contact.send': { en: 'Send message', fr: 'Envoyer le message' },
  'contact.sending': { en: 'Sending…', fr: 'Envoi…' },
  'contact.success': {
    en: 'Thank you! Your message has been sent. We will be in touch soon.',
    fr: 'Merci ! Votre message a été envoyé. Nous vous contacterons bientôt.',
  },
  'contact.error': {
    en: 'Something went wrong. Please try again.',
    fr: "Une erreur s'est produite. Veuillez réessayer.",
  },
  'contact.info': { en: 'Contact information', fr: 'Coordonnées' },
  'contact.reachus': { en: 'Reach us directly', fr: 'Joignez-nous directement' },

  // --- Footer ---
  'footer.tagline': {
    en: 'Securing the digital future of Algeria.',
    fr: "Sécuriser l'avenir numérique de l'Algérie.",
  },
  'footer.company': { en: 'Company', fr: 'Entreprise' },
  'footer.products': { en: 'Products', fr: 'Produits' },
  'footer.legal': { en: 'Registered company · RC 25B0266226', fr: 'Société enregistrée · RC 25B0266226' },
  'footer.rights': { en: 'All rights reserved.', fr: 'Tous droits réservés.' },
  'footer.admin': { en: 'Admin', fr: 'Admin' },

  // --- Admin ---
  'admin.login.title': { en: 'Admin sign in', fr: 'Connexion admin' },
  'admin.login.subtitle': { en: 'Access the Yanova Solutions dashboard.', fr: 'Accéder au tableau de bord Yanova Solutions.' },
  'admin.username': { en: 'Username', fr: "Nom d'utilisateur" },
  'admin.password': { en: 'Password', fr: 'Mot de passe' },
  'admin.signin': { en: 'Sign in', fr: 'Se connecter' },
  'admin.signingin': { en: 'Signing in…', fr: 'Connexion…' },
  'admin.badcreds': { en: 'Invalid username or password.', fr: "Nom d'utilisateur ou mot de passe invalide." },
  'admin.logout': { en: 'Log out', fr: 'Déconnexion' },
  'admin.nav.messages': { en: 'Messages', fr: 'Messages' },
  'admin.nav.blogs': { en: 'Blog posts', fr: 'Articles' },
  'admin.viewsite': { en: 'View site', fr: 'Voir le site' },
  'admin.messages.title': { en: 'Contact messages', fr: 'Messages de contact' },
  'admin.messages.empty': { en: 'No messages yet.', fr: 'Aucun message pour le moment.' },
  'admin.messages.unread': { en: 'unread', fr: 'non lus' },
  'admin.markread': { en: 'Mark read', fr: 'Marquer lu' },
  'admin.markunread': { en: 'Mark unread', fr: 'Marquer non lu' },
  'admin.delete': { en: 'Delete', fr: 'Supprimer' },
  'admin.confirmdelete': { en: 'Delete this permanently?', fr: 'Supprimer définitivement ?' },
  'admin.blogs.title': { en: 'Blog posts', fr: 'Articles de blog' },
  'admin.blogs.new': { en: 'New post', fr: 'Nouvel article' },
  'admin.blogs.empty': { en: 'No posts yet. Create your first one.', fr: "Aucun article. Créez le premier." },
  'admin.blogs.edit': { en: 'Edit', fr: 'Modifier' },
  'admin.blogs.draft': { en: 'Draft', fr: 'Brouillon' },
  'admin.blogs.published': { en: 'Published', fr: 'Publié' },
  'admin.editor.newtitle': { en: 'New blog post', fr: 'Nouvel article' },
  'admin.editor.edittitle': { en: 'Edit blog post', fr: "Modifier l'article" },
  'admin.editor.titleen': { en: 'Title (English)', fr: 'Titre (Anglais)' },
  'admin.editor.titlefr': { en: 'Title (French)', fr: 'Titre (Français)' },
  'admin.editor.excerpten': { en: 'Excerpt (English)', fr: 'Extrait (Anglais)' },
  'admin.editor.excerptfr': { en: 'Excerpt (French)', fr: 'Extrait (Français)' },
  'admin.editor.contenten': { en: 'Content — English (Markdown)', fr: 'Contenu — Anglais (Markdown)' },
  'admin.editor.contentfr': { en: 'Content — French (Markdown)', fr: 'Contenu — Français (Markdown)' },
  'admin.editor.cover': { en: 'Cover image URL (optional)', fr: "URL de l'image de couverture (optionnel)" },
  'admin.editor.tags': { en: 'Tags (comma separated)', fr: 'Tags (séparés par des virgules)' },
  'admin.editor.published': { en: 'Published (visible on site)', fr: 'Publié (visible sur le site)' },
  'admin.editor.save': { en: 'Save post', fr: "Enregistrer l'article" },
  'admin.editor.saving': { en: 'Saving…', fr: 'Enregistrement…' },
  'admin.editor.cancel': { en: 'Cancel', fr: 'Annuler' },
  'admin.editor.saved': { en: 'Post saved.', fr: 'Article enregistré.' },
  'admin.editor.required': { en: 'Please fill titles and content in both languages.', fr: 'Veuillez remplir titres et contenus dans les deux langues.' },

  // --- Hero extra ---
  'hero.trust': {
    en: 'Trusted for real-world network defense',
    fr: 'La confiance pour une défense réseau concrète',
  },

  // --- Trust / recognition bar ---
  'trust.label': {
    en: 'Recognized · Registered · Field-validated',
    fr: 'Reconnue · Enregistrée · Validée sur le terrain',
  },
  'trust.startup': { en: 'Labeled Startup', fr: 'Label Startup' },
  'trust.innovative': { en: 'Innovative Project Label', fr: 'Label Projet Innovant' },
  'trust.registered': { en: 'Registered · RC 25B0266226', fr: 'Enregistrée · RC 25B0266226' },
  'trust.incubated': { en: 'Incubated', fr: 'Incubée' },
  'trust.hospital': { en: 'Hospital-network tested', fr: 'Testé en réseau hospitalier' },
  'trust.galattica': { en: 'Recommended by Galattica', fr: 'Recommandé par Galattica' },

  // --- Why us / differentiators ---
  'why.eyebrow': { en: 'Why Yanova', fr: 'Pourquoi Yanova' },
  'why.title': {
    en: 'Enterprise-grade security, without the enterprise complexity',
    fr: "Une sécurité de niveau entreprise, sans la complexité",
  },
  'why.subtitle': {
    en: 'We engineer our own technology and stand behind it — proven in real networks, priced for the real world.',
    fr: "Nous concevons notre propre technologie et l'assumons — éprouvée sur des réseaux réels, à un prix réaliste.",
  },
  'why.1.t': { en: 'Home-grown technology', fr: 'Technologie locale' },
  'why.1.b': {
    en: 'We design and build our own products in Algeria — not resell someone else’s. Full control, full accountability.',
    fr: "Nous concevons et fabriquons nos propres produits en Algérie — sans revendre ceux des autres. Contrôle et responsabilité totaux.",
  },
  'why.2.t': { en: 'Proven in the field', fr: 'Éprouvée sur le terrain' },
  'why.2.b': {
    en: 'Cerberus Pi was validated inside a live hospital network and endorsed by an international networking partner.',
    fr: "Cerberus Pi a été validé au sein d'un réseau hospitalier réel et approuvé par un partenaire réseau international.",
  },
  'why.3.t': { en: 'Accessible by design', fr: 'Accessible par conception' },
  'why.3.b': {
    en: 'Compact, intuitive and affordable — robust protection usable even without an advanced security team.',
    fr: "Compacte, intuitive et abordable — une protection robuste utilisable même sans équipe de sécurité avancée.",
  },
  'why.4.t': { en: 'End-to-end partner', fr: 'Partenaire de bout en bout' },
  'why.4.b': {
    en: 'Products, consulting, secure hosting, training and equipment — one team across your whole security stack.',
    fr: "Produits, conseil, hébergement sécurisé, formation et équipements — une seule équipe pour toute votre sécurité.",
  },
  'why.metric1': { en: 'In-house products', fr: 'Produits maison' },
  'why.metric2': { en: 'Real-time', fr: 'Temps réel' },
  'why.metric2s': { en: 'Threat response', fr: 'Réponse aux menaces' },
  'why.metric3': { en: 'Decentralized', fr: 'Décentralisés' },
  'why.metric3s': { en: 'Tamper-proof logs', fr: 'Journaux inviolables' },

  // --- Testimonial ---
  'testi.eyebrow': { en: 'Partner endorsement', fr: 'Recommandation partenaire' },
  'testi.title': { en: 'Validated by industry partners', fr: 'Validé par des partenaires du secteur' },
  'testi.quote': {
    en: '“After testing Cerberus Pi in real enterprise environments, the solution proved its robustness and usefulness. We are confident recommending it to organizations that take network security seriously.”',
    fr: "« Après avoir testé Cerberus Pi dans des environnements d'entreprise réels, la solution a prouvé sa robustesse et son utilité. Nous la recommandons en toute confiance aux organisations qui prennent la sécurité réseau au sérieux. »",
  },
  'testi.author': { en: 'Galattica', fr: 'Galattica' },
  'testi.role': {
    en: 'Cisco & Fortinet networking partner — South Africa',
    fr: 'Partenaire réseau Cisco & Fortinet — Afrique du Sud',
  },
  'testi.factsT': { en: 'Field validation', fr: 'Validation terrain' },
  'testi.fact1': {
    en: 'Deployed and tested inside a live hospital network in Ghazaouet, Tlemcen.',
    fr: "Déployé et testé au sein d'un réseau hospitalier réel à Ghazaouet, Tlemcen.",
  },
  'testi.fact2': {
    en: 'Assessed alongside a network administrator and a cybersecurity specialist.',
    fr: "Évalué aux côtés d'un administrateur réseau et d'un spécialiste en cybersécurité.",
  },
  'testi.fact3': {
    en: 'Confirmed robustness against common threats in production conditions.',
    fr: 'Robustesse confirmée face aux menaces courantes en conditions réelles.',
  },

  // --- CTA band ---
  'cta.title': { en: 'Ready to secure what matters most?', fr: 'Prêt à sécuriser ce qui compte le plus ?' },
  'cta.subtitle': {
    en: 'Talk to the Yanova Solutions team about protecting your network, your data and your future.',
    fr: "Parlez à l'équipe Yanova Solutions de la protection de votre réseau, de vos données et de votre avenir.",
  },
  'cta.primary': { en: 'Start a conversation', fr: 'Démarrer une conversation' },
  'cta.secondary': { en: 'Explore products', fr: 'Découvrir les produits' },

  // --- Partners (public belt) ---
  'partners.label': { en: 'Our partners & clients', fr: 'Nos partenaires & clients' },

  // --- Partners (admin) ---
  'admin.nav.partners': { en: 'Partners', fr: 'Partenaires' },
  'admin.partners.title': { en: 'Partners', fr: 'Partenaires' },
  'admin.partners.subtitle': {
    en: 'Manage the partners shown in the belt on the homepage.',
    fr: "Gérez les partenaires affichés dans le bandeau de la page d'accueil.",
  },
  'admin.partners.new': { en: 'Add partner', fr: 'Ajouter un partenaire' },
  'admin.partners.empty': { en: 'No partners yet. Add your first one.', fr: 'Aucun partenaire. Ajoutez le premier.' },
  'admin.partners.name': { en: 'Partner name', fr: 'Nom du partenaire' },
  'admin.partners.logo': { en: 'Logo image URL (optional)', fr: "URL du logo (optionnel)" },
  'admin.partners.website': { en: 'Website URL (optional)', fr: 'URL du site web (optionnel)' },
  'admin.partners.order': { en: 'Order', fr: 'Ordre' },
  'admin.partners.namereq': { en: 'Partner name is required.', fr: 'Le nom du partenaire est requis.' },
  'admin.partners.save': { en: 'Save partner', fr: 'Enregistrer' },
  'admin.partners.saving': { en: 'Saving…', fr: 'Enregistrement…' },
  'admin.partners.cancel': { en: 'Cancel', fr: 'Annuler' },
  'admin.partners.edit': { en: 'Edit', fr: 'Modifier' },
  'admin.partners.nologo': { en: 'Text only (no logo)', fr: 'Texte seul (sans logo)' },

  // --- Misc ---
  'nf.title': { en: 'Page not found', fr: 'Page introuvable' },
  'nf.back': { en: 'Back to home', fr: "Retour à l'accueil" },
};
