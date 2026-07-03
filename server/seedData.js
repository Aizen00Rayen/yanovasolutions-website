// Starter content inserted automatically on first boot (see seedInitialData in db.js).
// Kept in its own module (no imports) so it can be shared by db.js and seed.js.

export const seedPartners = [
  { name: 'Galattica', logo_url: '', website_url: 'https://galattica.co.za', sort_order: 0 },
];

export const seedPosts = [
  {
    title_en: 'Introducing Cerberus Pi: Enterprise-grade network defense, pocket-sized',
    title_fr: 'Cerberus Pi : une défense réseau de niveau entreprise, format de poche',
    excerpt_en:
      'How we shrank a full IDS/IPS into a Raspberry-Pi-sized device with decentralized log storage on IPFS.',
    excerpt_fr:
      "Comment nous avons condensé un IDS/IPS complet dans un boîtier de la taille d'un Raspberry Pi, avec stockage décentralisé des journaux sur IPFS.",
    content_en: `Traditional intrusion detection and prevention systems are powerful — but bulky, expensive, and hard to operate without a dedicated security team.

**Cerberus Pi** rethinks that. In a footprint the size of a Raspberry Pi, it delivers:

- **IDS mode** — real-time traffic analysis with fully customizable rules.
- **IPS mode** — active blocking of threats before they reach your network.
- **Priority-coded alerts** — incidents organized visually by severity.
- **Decentralized logging** — daily security logs stored on IPFS for tamper-proof traceability.

It was field-tested inside a hospital network in Ghazaouet, Tlemcen, and is recommended by Galattica, a South-African Cisco & Fortinet reseller.

Cybersecurity should not be a luxury. Cerberus Pi makes robust network protection accessible to any organization.`,
    content_fr: `Les systèmes traditionnels de détection et de prévention d'intrusion sont puissants — mais volumineux, coûteux et difficiles à exploiter sans équipe de sécurité dédiée.

**Cerberus Pi** repense cette approche. Dans un format de la taille d'un Raspberry Pi, il offre :

- **Mode IDS** — analyse du trafic en temps réel avec des règles entièrement personnalisables.
- **Mode IPS** — blocage actif des menaces avant qu'elles n'atteignent votre réseau.
- **Alertes à code couleur** — incidents organisés visuellement par niveau de priorité.
- **Journalisation décentralisée** — journaux de sécurité quotidiens stockés sur IPFS pour une traçabilité inviolable.

Il a été testé en conditions réelles au sein du réseau d'un hôpital à Ghazaouet, Tlemcen, et est recommandé par Galattica, revendeur sud-africain Cisco & Fortinet.

La cybersécurité ne devrait pas être un luxe. Cerberus Pi rend la protection réseau robuste accessible à toute organisation.`,
    tags: 'Cerberus Pi, IDS, IPS, Network Security',
    cover_image: '',
  },
  {
    title_en: '5 network hygiene habits every small business should adopt',
    title_fr: '5 réflexes de sécurité réseau que toute PME devrait adopter',
    excerpt_en:
      'Simple, high-impact practices to reduce your attack surface — no large budget required.',
    excerpt_fr:
      "Des pratiques simples et à fort impact pour réduire votre surface d'attaque — sans gros budget.",
    content_en: `You don't need an enterprise budget to be meaningfully more secure. Start here:

1. **Segment your network.** Keep guest, IoT, and business devices on separate VLANs.
2. **Patch relentlessly.** Most breaches exploit known, already-fixed vulnerabilities.
3. **Enforce strong, unique passwords** and enable multi-factor authentication everywhere.
4. **Monitor your traffic.** You cannot defend what you cannot see — a lightweight IDS like Cerberus Pi helps.
5. **Back up, and test your backups.** A backup you have never restored is a hope, not a plan.

Want a tailored assessment? Get in touch with the Yanova Solutions team.`,
    content_fr: `Vous n'avez pas besoin d'un budget d'entreprise pour être nettement plus sécurisé. Commencez ici :

1. **Segmentez votre réseau.** Séparez les appareils invités, IoT et professionnels sur des VLAN distincts.
2. **Appliquez les correctifs sans relâche.** La plupart des attaques exploitent des vulnérabilités connues et déjà corrigées.
3. **Imposez des mots de passe forts et uniques** et activez l'authentification multifacteur partout.
4. **Surveillez votre trafic.** On ne peut défendre que ce que l'on voit — un IDS léger comme Cerberus Pi y aide.
5. **Sauvegardez, et testez vos sauvegardes.** Une sauvegarde jamais restaurée est un espoir, pas un plan.

Vous souhaitez un audit personnalisé ? Contactez l'équipe Yanova Solutions.`,
    tags: 'Best Practices, SMB, Network Security',
    cover_image: '',
  },
];
