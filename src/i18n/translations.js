/**
 * Single source of truth for all copy.
 *
 * Content is written against docs/PLATFORM-OVERVIEW.md — the real platform, not
 * an aspirational version of it. Two rules follow from that document and are
 * enforced here:
 *
 *   1. Nothing unbuilt is stated as shipped. The portal's grid domain (sectors,
 *      substations, load in MW) has no backend, so peak analytics and ESG are
 *      framed as roadmap. What runs today — the wilaya-scoped map, resident
 *      reports, field dispatch, public alerts, bill issuance — leads instead.
 *   2. The relay switches eligible secondary circuits on a claimed kit. It
 *      cannot disconnect the Sonelgaz supply, and the copy says so.
 *
 * Conventions frozen by docs/localization-audit.md §11:
 *   - Product name: "TaQa Contrôle" (EN/FR) · "طاقة كونترول" (AR — ط, never ت)
 *   - Tariff band: "tranche" (EN/FR) · "شريحة/الشرائح" (AR)
 *   - Admin unit:  "wilaya" untranslated in all three
 *   - Hardware:    "kit" / "kit" / "عدّة" — the paired kit; "module" for the meter unit
 *   - Carbon:      CO₂ (U+2082), spelled out in Arabic body copy
 *   - French typography: no-break space ( ) before % : ! ? »
 *   - Minus sign: − (U+2212), never hyphen-minus
 *   - Arabic strings mixing Latin/digits carry an LRM (‎) where needed
 *   - Every headline is ONE string. No <br>-driven splits: CSS controls wrapping.
 *
 * The canonical three-beat slogan appears exactly once, as hero.eyebrow.
 */

export const BRAND = {
  fr: 'TaQa Contrôle',
  en: 'TaQa Contrôle',
  ar: 'طاقة كونترول',
};

/** Sonelgaz's own e-payment portal, which the app opens in a webview. */
export const EPAYMENT_HOST = 'epayement.elit.dz';

export const translations = {
  fr: {
    meta: {
      locale: 'fr',
      ogLocale: 'fr_FR',
      dir: 'ltr',
      title: 'TaQa Contrôle — Voyez votre consommation avant la facture',
      description:
        'Photographiez votre facture Sonelgaz, suivez votre tranche en direct, payez sans quitter l’application. Et avec un kit : consommation par circuit et pilotage à distance. Conçu en Algérie.',
      ogAlt: 'Tableau de bord TaQa Contrôle : consommation par circuit et par tranche Sonelgaz',
      keywords:
        'facture Sonelgaz, tranches Sonelgaz, scanner facture, paiement Sonelgaz en ligne, consommation électrique Algérie, relevé compteur, suivi énergie Algérie',
    },

    nav: {
      home: 'Accueil',
      problem: 'Le problème',
      how: 'Comment ça marche',
      devices: 'Appareils',
      providers: 'Fournisseurs',
      faq: 'FAQ',
      cta: 'Commencer le suivi',
      menu: 'Menu',
      close: 'Fermer',
      language: 'Langue',
    },

    hero: {
      eyebrow: 'Voyez. Comprenez. Économisez.',
      h1: "Le problème, ce n'est pas votre facture. C'est de ne pas la voir venir.",
      h1Accent: 'de ne pas la voir venir',
      sub: "Une facture élevée vient d'une consommation que vous ne voyez pas. TaQa Contrôle vous montre en temps réel ce que consomme votre foyer, circuit par circuit, vous indique votre tranche Sonelgaz et vous alerte avant la facture.",
      proof: [
        'Suivi en temps réel par circuit',
        'Votre facture détaillée par tranche',
        'Alertes : pics, anomalies, budget',
        'Pilotez vos circuits à distance',
      ],
      ctaPrimary: 'Commencer le suivi',
      ctaSecondary: "Pour les fournisseurs d'énergie",
      noKit: 'Pas de kit ? Commencez avec votre facture papier.',
      callouts: [
        { icon: 'gauge', tone: 'gold', value: '18 kWh', label: 'avant la tranche plus chère' },
        { icon: 'card', tone: 'green', value: '796 DZD', label: 'dépensés ce trimestre' },
        { icon: 'leaf', tone: 'greenSoft', value: '147 kg CO₂', label: '≈ 80 arbres pendant un mois' },
      ],
      meter: {
        label: 'Ce trimestre',
        unit: 'kWh',
        cost: 'estimé ce trimestre',
        tranche: 'Tranche',
        trancheNext: 'avant la tranche',
        caught: 'Alerte envoyée',
        caughtDesc: 'Vous approchez de la tranche 3. Il reste {n} kWh.',
        live: 'En direct',
      },
    },

    problem: {
      eyebrow: 'LE VRAI PROBLÈME',
      title: 'La facture arrive. Trois mois trop tard.',
      lead: "Sonelgaz relève votre compteur une fois par trimestre. D'ici là, vous avancez à l'aveugle : une habitude prise en juin ne se paie qu'en septembre.",
      cards: [
        {
          title: 'Une consommation invisible',
          body: "Impossible de désigner l'appareil responsable. Vous voyez un montant, jamais une cause.",
          stat: '90',
          statUnit: 'jours sans retour',
        },
        {
          title: 'Le saut de tranche',
          body: 'Passer la 2ᵉ tranche multiplie votre prix du kWh par 2,35 — et fait passer la TVA de 9 % à 19 %.',
          stat: '×2,35',
          statUnit: 'au 126ᵉ kWh',
        },
        {
          title: "L'été qui coûte cher",
          body: "Un foyer climatisé dépasse 1 200 kWh sur un trimestre d'été. Chaque kWh au-delà de 1 000 coûte 5,48 DA.",
          stat: '21 828',
          statUnit: 'MW au pic national, été 2026',
        },
      ],
      footnote:
        "Tarifs ménages Sonelgaz, code 54 M : 4 tranches trimestrielles progressives. Les 125 premiers kWh restent toujours au tarif social — seuls les kWh suivants changent de prix. Pic national : Sonelgaz, été 2026.",
    },

    solution: {
      eyebrow: 'LA VISIBILITÉ',
      title: 'Votre compteur, enfin lisible.',
      lead: "Où vous en êtes dans les 4 tranches Sonelgaz, ce qu'il reste avant la suivante, et ce que vous devez déjà — mis à jour sans attendre le relevé.",
      pillars: [
        {
          title: 'Connaissez votre tranche avant de la franchir',
          body: "L'échelle des tranches, les tarifs, votre position exacte et les kWh restants avant la marche suivante.",
        },
        {
          title: 'Votre estimation du trimestre, détaillée',
          body: "Le cumul de vos relevés, réparti tranche par tranche et poste par poste. Toujours présenté comme une estimation, jamais comme un montant validé par Sonelgaz.",
        },
        {
          title: 'Chaque circuit, pas seulement un total',
          body: "Avec un kit : éclairage, prises, climatisation, chauffe-eau — chaque ligne de votre tableau a sa propre courbe.",
        },
      ],
      tranches: {
        heading: 'Votre facture, répartie sur les 4 tranches Sonelgaz',
        legend: ['Tranche 1 — tarif social', 'Tranche 2', 'Tranche 3', 'Tranche 4'],
        price: 'DA/kWh',
        you: 'Vous êtes ici',
      },
    },

    modes: {
      eyebrow: 'DEUX FAÇONS DE COMMENCER',
      title: 'Aucun matériel requis pour démarrer.',
      lead: "La plupart des foyers commencent sans rien installer. Le kit ajoute le temps réel et le pilotage — il ne conditionne pas l'essentiel.",
      cards: [
        {
          badge: 'Sans matériel',
          title: 'Votre téléphone et votre facture papier',
          body: 'Photographiez votre facture Sonelgaz : la lecture automatique remplit les champs, vous les corrigez, et tout est enregistré. Saisissez vos relevés de compteur à la main et suivez votre tranche et votre estimation du trimestre.',
          points: [
            'Scan de la facture avec correction avant enregistrement',
            'Relevés manuels et historique trimestriel',
            'Échelle des tranches et estimation détaillée',
            'Paiement sur le portail Sonelgaz, sans quitter l’application',
          ],
        },
        {
          badge: 'Avec le kit',
          title: 'Le module de mesure et le pilotage',
          body: "Un module se pose sur votre tableau électrique, une voie de mesure par circuit. Vous passez du trimestre à la seconde, et vous pouvez agir à distance.",
          points: [
            'Consommation en direct, circuit par circuit',
            'Détail par appareil là où le matériel sait l’attribuer',
            'Pilotage à distance des circuits secondaires',
            'Plafond de budget appliqué automatiquement',
          ],
        },
      ],
      note: "Un foyer sans kit voit une version honnête de l'application, pas une interface trouée d'emplacements vides.",
    },

    how: {
      eyebrow: 'COMMENT ÇA MARCHE',
      title: 'De votre facture papier à votre téléphone, en quatre étapes.',
      steps: [
        {
          title: 'Vous vous inscrivez',
          body: "Un numéro de téléphone et un code reçu par SMS. Vous nommez votre foyer et saisissez votre numéro de compteur.",
        },
        {
          title: 'Vous alimentez',
          body: "Photographiez votre facture, ou saisissez un relevé. Avec un kit, la mesure arrive toute seule, chaque seconde et par circuit.",
        },
        {
          title: 'Vous comprenez',
          body: "Votre tranche, ce qu'il reste avant la suivante, votre estimation du trimestre détaillée poste par poste.",
        },
        {
          title: 'Vous agissez',
          body: "Payez sur le portail Sonelgaz sans quitter l'application. Avec un kit, coupez un circuit secondaire depuis votre téléphone.",
        },
      ],
    },

    features: {
      eyebrow: 'CE QUE VOUS OBTENEZ',
      title: 'Six choses que votre facture ne vous dira jamais.',
      items: [
        {
          title: 'Votre facture, photographiée',
          body: "La lecture automatique extrait les champs, vous les corrigez avant enregistrement. Un doublon déclenche un avertissement, jamais un blocage.",
        },
        {
          title: 'Payer sans chercher le portail',
          body: `L'application ouvre le portail de paiement Sonelgaz et remplit la facture, le montant et la clé pour vous. Aucun bouton de paiement sur une facture déjà réglée.`,
        },
        {
          title: 'Où vous en êtes dans les tranches',
          body: "Les quatre tranches, leurs tarifs, votre position et les kWh restants avant la marche suivante.",
        },
        {
          title: 'Vos factures, séparées de vos photos',
          body: "« Mes factures » ne montre que ce que Sonelgaz a émis. Vos scans restent dans l'historique, à part.",
        },
        {
          title: 'Alertes et signalements',
          body: "Seuil de budget, coupure, retour du courant, facture à échéance — et les alertes publiées par l'opérateur pour votre wilaya, dans une seule liste.",
        },
        {
          title: 'Votre foyer, à plusieurs',
          body: "Plusieurs logements par compte, et le partage d'un foyer avec vos proches en propriétaire, administrateur ou lecteur.",
        },
      ],
    },

    dashboard: {
      eyebrow: 'LE PORTAIL OPÉRATEUR',
      title: 'La salle de contrôle, sur un seul écran.',
      lead: "Le portail que voient les équipes Sonelgaz : la carte du réseau par wilaya, la corbeille des signalements, le composeur d'alertes et le journal d'audit. Quatre rôles, un périmètre géographique par compte.",
      bullets: [
        'Carte du réseau, wilaya par wilaya',
        'Signalements : accuser, qualifier, attribuer, résoudre',
        'Alertes publiques avec aperçu des destinataires',
        'Journal d’audit derrière chaque écriture',
      ],
      alt: "Portail opérateur TaQa Contrôle : vue d'ensemble du réseau, carte par wilaya et courbes de charge",
      hint: 'Déplacez la souris pour incliner l’écran',
      caption:
        "Capture du portail. Les indicateurs de charge affichés ici sont illustratifs : le domaine réseau est maquetté, pas encore raccordé (voir la feuille de route).",
    },

    devices: {
      eyebrow: 'CONTRÔLE',
      title: 'Ce que vous pouvez couper — et ce que vous ne pouvez pas.',
      support: 'Éteignez ce que vous avez oublié, où que vous soyez.',
      remote: 'Piloté à distance',
      essentialTitle: 'Appareils essentiels',
      essentialNote: 'Protégés : pas de coupure depuis l’application.',
      secondaryTitle: 'Appareils non essentiels',
      secondaryNote: 'À vous de décider, d’où que vous soyez.',
      locked: 'Verrouillé',
      essentials: [
        { name: 'Réfrigérateur', room: 'Cuisine', icon: 'fridge', watts: 120, dzd: 9 },
        { name: 'Congélateur', room: 'Cuisine', icon: 'freezer', watts: 95, dzd: 7 },
        { name: 'Pompe à eau', room: 'Extérieur', icon: 'waterPump', watts: 0, dzd: 3 },
        { name: 'Éclairage intérieur', room: 'Salon', icon: 'lighting', watts: 40, dzd: 2 },
      ],
      secondary: [
        { name: 'Climatiseur', room: 'Salon', icon: 'ac', watts: 1450, dzd: 34 },
        { name: 'Four', room: 'Cuisine', icon: 'oven', watts: 2200, dzd: 21 },
        { name: 'Chauffe-eau', room: 'Salle de bain', icon: 'waterHeater', watts: 1800, dzd: 18 },
      ],
      total: 'Total en direct',
      on: 'Activé',
      off: 'Éteint',
      toggleLabel: 'Allumer ou éteindre {name}',
      extras: [
        { title: 'Mode absence', body: "L'application le propose quand le logement semble vide, et vous prévient à la fin de la session." },
        { title: 'Programmations', body: 'Des plages de marche et d’arrêt récurrentes, réglées au pouce.' },
        { title: 'Effacement du foyer', body: 'Vous choisissez quel circuit cède en premier quand le plafond de budget est atteint.' },
      ],
      limit:
        "Le relais commute les circuits secondaires éligibles d'un kit appairé. Il ne coupe pas votre alimentation Sonelgaz, et un appareil marqué P1 ne peut pas être coupé depuis l'application.",
    },

    loop: {
      eyebrow: 'SIGNALEMENTS',
      title: 'Un problème signalé arrive à quelqu’un.',
      lead: "Vous photographiez, vous envoyez. Le signalement entre dans la corbeille des opérateurs qui couvrent votre wilaya, et chaque changement de statut vous revient.",
      steps: [
        { title: 'Vous signalez', body: 'Avec photos, depuis le tableau de bord.' },
        { title: 'L’opérateur accuse réception', body: 'Puis qualifie et attribue le signalement.' },
        { title: 'Un agent est dépêché', body: 'Un ordre de travail est proposé, accepté, suivi.' },
        { title: 'Vous êtes tenu informé', body: 'Le statut change chez vous quand il change chez eux.' },
      ],
    },

    providers: {
      eyebrow: "POUR LES FOURNISSEURS D'ÉNERGIE",
      title: 'Le portail opérateur, de la wilaya jusqu’au compteur.',
      lead: "Quatre rôles, un périmètre géographique par compte, et un journal d'audit derrière chaque écriture. Le serveur croise ce périmètre avec chaque requête.",
      items: [
        {
          title: 'Carte réseau',
          body: "Agrégats par wilaya, puis les foyers d'une wilaya, puis un foyer. Les agrégats ne portent aucune coordonnée, à aucun niveau de zoom.",
        },
        {
          title: 'Signalements et terrain',
          body: "La corbeille des signalements résidents, les transitions accuser → qualifier → attribuer → résoudre, et la planche de dispatch des agents.",
        },
        {
          title: 'Alertes publiques',
          body: "Un composeur avec copie française et arabe, ciblage géographique, et un aperçu du nombre de destinataires avant publication.",
        },
        {
          title: 'Émission de factures',
          body: "Depuis la fiche du foyer, une fois établi de quel foyer il s'agit. Le même numéro de facture deux fois sur un foyer est refusé.",
        },
      ],
      alarms: {
        title: 'Deux distinctions qui ne se brouillent jamais',
        items: [
          {
            title: 'Le courant de fuite est son propre niveau',
            body: "Au-dessus de « danger ». Un courant qui trouve un chemin par la plomberie, un mur humide ou une personne n'est pas un risque d'équipement. L'un envoie une équipe au rythme normal ; l'autre l'envoie maintenant.",
          },
          {
            title: 'Un déclenchement n’est pas une coupure réseau',
            body: "Un déclenchement veut dire que la protection du foyer s'est ouverte et que l'équipe doit aller à la maison. Une coupure veut dire que l'alimentation manque en amont et que l'équipe doit aller au poste. Les confondre envoie l'équipe au mauvais endroit.",
          },
        ],
      },
      stat: {
        value: '21 828',
        unit: 'MW',
        label: 'pic national, été 2026 — cinquième record de la saison (Sonelgaz)',
      },
      roadmap:
        "Feuille de route : analytique de pointe, effacement et rapports ESG sont conçus et maquettés, sans service derrière eux à ce jour.",
      cta: 'Demander une démonstration du portail',
    },

    trust: {
      eyebrow: 'LA CONFIANCE',
      triad: ['Simple', 'Sécurisé', 'Algérien'],
      title: 'Ce que nous refusons d’affirmer.',
      items: [
        {
          title: 'Une estimation reste une estimation',
          body: "Votre cumul du trimestre est étiqueté comme une estimation partout où il apparaît, et n'est jamais présenté comme un montant validé par Sonelgaz.",
        },
        {
          title: 'Une photo n’est pas une créance',
          body: "Ce qu'une caméra a cru lire et ce que Sonelgaz a émis ne se ressemblent pas à l'écran. Le premier est la revendication la plus faible, et il est dessiné comme tel.",
        },
        {
          title: 'Hors de votre périmètre : rien',
          body: "Demander une wilaya hors de son périmètre ne renvoie rien, et non une erreur — distinguer les deux confirmerait qu'une région contient des données à quelqu'un qui ne doit pas les voir.",
        },
        {
          title: '« Envoyé » n’est pas « reçu »',
          body: "Une notification est enregistrée comme tentée, pas comme reçue. Ce sont deux affirmations différentes et le schéma les garde séparées.",
        },
      ],
      extra: [
        'Vos données restent en Algérie et ne sont jamais partagées sans votre accord.',
        'Trois langues, avec miroir complet en arabe. Un numéro de compteur reste lisible de gauche à droite.',
        'Accessibilité WCAG AA : les états ne se distinguent jamais par la seule couleur.',
        'Électricité aujourd’hui. Eau et gaz demain.',
      ],
    },

    faq: {
      eyebrow: 'QUESTIONS FRÉQUENTES',
      title: "Tout ce qu'il faut savoir avant de commencer",
      desc: "Matériel, sécurité, paiement : les réponses aux questions qui reviennent le plus.",
      items: [
        {
          q: "Ai-je besoin de matériel pour commencer ?",
          a: "Non. Un téléphone et votre facture papier suffisent : vous la photographiez, vous corrigez ce que la lecture automatique a extrait, et vous suivez votre tranche et votre estimation du trimestre. Le kit ajoute le temps réel par circuit et le pilotage à distance — il ne conditionne pas l'essentiel.",
        },
        {
          q: "Ai-je besoin d'un compteur spécial ?",
          a: "Non. Le kit se pose en complément de votre installation, via un module de mesure compatible avec les compteurs Sonelgaz habituels. Dans la grande majorité des cas, aucun remplacement de compteur n'est nécessaire.",
        },
        {
          q: 'Comment connaissez-vous ma tranche Sonelgaz ?',
          a: "TaQa Contrôle cumule votre consommation depuis le début de votre trimestre de facturation — à partir de vos relevés, ou de la mesure du kit — et applique le barème ménages en vigueur, à quatre tranches progressives. Vous voyez votre position exacte et les kWh restants avant la tranche suivante.",
        },
        {
          q: 'Puis-je payer ma facture depuis l’application ?',
          a: `Oui. L'application ouvre le portail de paiement Sonelgaz (${EPAYMENT_HOST}) et renseigne le numéro de facture, le montant et la clé à partir de la facture enregistrée. Le paiement se fait sur le portail Sonelgaz, pas chez nous.`,
        },
        {
          q: 'TaQa Contrôle peut-il couper mon électricité ?',
          a: "Non. Le relais commute les circuits secondaires éligibles d'un kit appairé — un chauffe-eau, un climatiseur. Il ne peut pas couper votre alimentation Sonelgaz, et les circuits que vous marquez comme critiques ne peuvent pas être coupés depuis l'application. C'est une limite de conception, pas un oubli.",
        },
        {
          q: 'Mes données sont-elles sécurisées ?',
          a: "Vos données sont hébergées en Algérie et ne sont jamais partagées sans votre accord explicite. Les droits d'un lecteur découlent de ses adhésions à un foyer, pas d'une revendication globale de son compte. Vous pouvez exporter vos données ou en demander la suppression à tout moment.",
        },
        {
          q: "L'application fonctionne-t-elle sans connexion stable ?",
          a: "Un profil et un foyer déjà consultés restent affichés hors ligne. Avec un kit, la mesure continue et remonte au retour du réseau. Un tout premier lancement sans connexion n'a rien à montrer, et le dit.",
        },
        {
          q: 'Puis-je gérer plusieurs logements ?',
          a: "Oui. Un compte peut porter plusieurs foyers, chacun avec son offre, son matériel et votre rôle. Un foyer se partage avec vos proches en propriétaire, administrateur ou lecteur, par invitation à durée limitée.",
        },
      ],
    },

    finalCta: {
      title: "Votre prochaine facture s'écrit déjà. Commencez à la lire.",
      sub: 'Commencez avec votre facture papier, aujourd’hui. Le kit viendra quand vous le voudrez.',
      button: 'Commencer le suivi',
      secondary: "Pour les fournisseurs d'énergie",
    },

    footer: {
      tagline: 'La visibilité avant la facture.',
      rights: 'Tous droits réservés.',
      devBy: 'Développé par',
      language: 'Langue',
      backToTop: 'Haut de page',
    },

    alt: {
      logo: 'TaQa Contrôle',
      heroPhone: "Application TaQa Contrôle affichant la consommation en temps réel par circuit",
      dashboardScreen: 'Tableau de bord TaQa Contrôle : consommation par circuit et par tranche Sonelgaz',
      bill: "Facture d'électricité reçue en fin de trimestre",
      scan: 'Facture papier photographiée dans l’application',
      anomaly: 'Alerte signalant une consommation anormale sur un circuit',
      budgetAlert: 'Notification de dépassement de budget mensuel',
      peak: 'Graphique montrant un pic de consommation',
      realtime: 'Courbe de consommation en temps réel',
      remote: 'Téléphone pilotant un circuit à distance',
      switch: 'Interrupteur connecté commandant un circuit',
      co2: 'Empreinte carbone exprimée en kilogrammes de CO₂',
      map: 'Carte du réseau par wilaya',
    },

    a11y: {
      icon3dLabel: 'Illustration animée : {name}',
      chartLabel: 'Graphique : {name}',
      reducedMotion: 'Animations réduites',
    },
  },

  en: {
    meta: {
      locale: 'en',
      ogLocale: 'en_US',
      dir: 'ltr',
      title: 'TaQa Contrôle — See your electricity before the bill does',
      description:
        'Photograph your Sonelgaz bill, track your tranche as it fills, and pay without leaving the app. Add a kit for per-circuit consumption and remote switching. Built in Algeria.',
      ogAlt: 'TaQa Contrôle dashboard: consumption by circuit and by Sonelgaz tranche',
      keywords:
        'Sonelgaz bill, Sonelgaz tranches, scan electricity bill, pay Sonelgaz online, electricity consumption Algeria, meter reading, energy monitoring Algeria',
    },

    nav: {
      home: 'Home',
      problem: 'The problem',
      how: 'How it works',
      devices: 'Devices',
      providers: 'Providers',
      faq: 'FAQ',
      cta: 'Start monitoring',
      menu: 'Menu',
      close: 'Close',
      language: 'Language',
    },

    hero: {
      eyebrow: 'See it. Understand it. Save.',
      h1: "Your bill isn't the problem. Not seeing it coming is.",
      h1Accent: 'Not seeing it coming',
      sub: 'High bills come from consumption you never see. TaQa Contrôle shows what your home uses in real time, circuit by circuit, tells you which Sonelgaz tranche you’re in, and warns you before the bill does.',
      proof: [
        'Real-time tracking per circuit',
        'Your bill broken down by tranche',
        'Alerts for peaks, anomalies and budget',
        'Turn circuits on or off remotely',
      ],
      ctaPrimary: 'Start monitoring',
      ctaSecondary: 'For energy providers',
      noKit: 'No kit? Start with your paper bill.',
      callouts: [
        { icon: 'gauge', tone: 'gold', value: '18 kWh', label: 'before the pricier tranche' },
        { icon: 'card', tone: 'green', value: '796 DZD', label: 'spent this quarter' },
        { icon: 'leaf', tone: 'greenSoft', value: '147 kg CO₂', label: '≈ 80 trees for a month' },
      ],
      meter: {
        label: 'This quarter',
        unit: 'kWh',
        cost: 'estimated this quarter',
        tranche: 'Tranche',
        trancheNext: 'to next tranche',
        caught: 'Alert sent',
        caughtDesc: 'You’re approaching tranche 3. {n} kWh left.',
        live: 'Live',
      },
    },

    problem: {
      eyebrow: 'THE REAL PROBLEM',
      title: 'The bill arrives. Three months too late.',
      lead: 'Sonelgaz reads your meter once a quarter. Until then you’re guessing — and a habit you form in June is first priced in September.',
      cards: [
        {
          title: 'Consumption you can’t see',
          body: 'You can’t name the appliance that did it. You get an amount, never a cause.',
          stat: '90',
          statUnit: 'days without feedback',
        },
        {
          title: 'The tranche jump',
          body: 'Crossing into tranche 2 multiplies your price per kWh by 2.35 — and doubles VAT from 9% to 19%.',
          stat: '×2.35',
          statUnit: 'at the 126th kWh',
        },
        {
          title: 'The summer that costs',
          body: 'An air-conditioned home passes 1,200 kWh in a summer quarter. Every kWh above 1,000 costs 5.48 DA.',
          stat: '21,828',
          statUnit: 'MW national peak, summer 2026',
        },
      ],
      footnote:
        'Sonelgaz household tariff, code 54 M: four progressive quarterly tranches. Your first 125 kWh always stay at the social rate — only the kWh above each threshold are repriced. National peak: Sonelgaz, summer 2026.',
    },

    solution: {
      eyebrow: 'VISIBILITY',
      title: 'A meter you can finally read.',
      lead: 'Where you sit across the four Sonelgaz tranches, how much room is left before the next one, and what you already owe — updated without waiting for the reading.',
      pillars: [
        {
          title: 'Know your tranche before you cross it',
          body: 'The tranche ladder, the rates, your exact position, and the kWh left before the next step up.',
        },
        {
          title: 'Your quarter, itemised',
          body: 'Your readings accumulated, split per tranche and per charge. Labelled an estimate everywhere it appears, and never presented as a figure Sonelgaz has agreed.',
        },
        {
          title: 'Every circuit, not just a total',
          body: 'With a kit: lighting, sockets, air conditioning, water heater — every line on your panel gets its own curve.',
        },
      ],
      tranches: {
        heading: 'Your bill, split across the four Sonelgaz tranches',
        legend: ['Tranche 1 — social rate', 'Tranche 2', 'Tranche 3', 'Tranche 4'],
        price: 'DA/kWh',
        you: 'You are here',
      },
    },

    modes: {
      eyebrow: 'TWO WAYS TO START',
      title: 'No hardware required to begin.',
      lead: 'Most households start without installing anything. The kit adds real time and control — it is not the price of entry.',
      cards: [
        {
          badge: 'No hardware',
          title: 'Your phone and your paper bill',
          body: 'Photograph your Sonelgaz bill: the reader extracts the fields, you correct them, and it is saved. Enter meter readings by hand and follow your tranche and your estimate for the quarter.',
          points: [
            'Bill scanning, with your correction before anything is saved',
            'Manual readings and quarterly history',
            'The tranche ladder and an itemised estimate',
            'Payment on the Sonelgaz portal, without leaving the app',
          ],
        },
        {
          badge: 'With the kit',
          title: 'The metering module and remote control',
          body: 'A module fits onto your electrical panel, one measurement channel per circuit. You move from the quarter to the second — and you can act from anywhere.',
          points: [
            'Live consumption, circuit by circuit',
            'Per-appliance breakdown where the hardware can attribute it',
            'Remote switching of secondary circuits',
            'A budget cap enforced automatically',
          ],
        },
      ],
      note: 'A household without a kit sees an honest version of the app, not a hardware-shaped one with empty slots.',
    },

    how: {
      eyebrow: 'HOW IT WORKS',
      title: 'From your paper bill to your phone, in four steps.',
      steps: [
        {
          title: 'You sign up',
          body: 'A phone number and a code by SMS. You name your home and enter your meter number.',
        },
        {
          title: 'You feed it',
          body: 'Photograph a bill, or enter a reading. With a kit, the measurement arrives on its own — every second, per circuit.',
        },
        {
          title: 'You understand',
          body: 'Your tranche, the room left before the next one, and your estimate for the quarter broken down charge by charge.',
        },
        {
          title: 'You act',
          body: 'Pay on the Sonelgaz portal without leaving the app. With a kit, switch a secondary circuit off from your phone.',
        },
      ],
    },

    features: {
      eyebrow: 'WHAT YOU GET',
      title: 'Six things your bill will never tell you.',
      items: [
        {
          title: 'Your bill, photographed',
          body: 'The reader extracts the fields and you correct them before anything is saved. A duplicate raises a warning, never a block.',
        },
        {
          title: 'Pay without hunting for the portal',
          body: `The app opens the Sonelgaz payment portal and fills in the invoice, the amount and the key for you. No pay control is offered on a bill already settled.`,
        },
        {
          title: 'Where you sit in the tranches',
          body: 'All four tranches, their rates, your position, and the kWh left before the next step up.',
        },
        {
          title: 'Your bills, kept apart from your photos',
          body: '“My bills” shows only what Sonelgaz issued. Your own scans stay in the history, separately.',
        },
        {
          title: 'Alerts and reports',
          body: 'Budget thresholds, blackouts, restorations, a bill coming due — and the alerts your operator published for your wilaya, in one list.',
        },
        {
          title: 'Your home, shared',
          body: 'Several homes on one account, and a home shared with your family as owner, admin or viewer.',
        },
      ],
    },

    dashboard: {
      eyebrow: 'THE OPERATOR PORTAL',
      title: 'The control room, on one screen.',
      lead: 'The portal Sonelgaz teams see: the network map by wilaya, the resident-report inbox, the public-alert composer and the audit log. Four roles, one geographic scope per account.',
      bullets: [
        'The network map, wilaya by wilaya',
        'Reports: acknowledge, triage, assign, resolve',
        'Public alerts with a recipient preview',
        'An audit row behind every write',
      ],
      alt: 'TaQa Contrôle operator portal: network overview, map by wilaya and load curves',
      hint: 'Move your cursor to tilt the screen',
      caption:
        'A portal screenshot. The load figures shown here are illustrative: the grid domain is prototyped, not yet wired (see the roadmap).',
    },

    devices: {
      eyebrow: 'CONTROL',
      title: 'What you can switch off — and what you can’t.',
      support: 'Turn off what you forgot, from anywhere.',
      remote: 'Controlled remotely',
      essentialTitle: 'Essential appliances',
      essentialNote: 'Protected: no switching off from the app.',
      secondaryTitle: 'Non-essential appliances',
      secondaryNote: 'Yours to decide, from wherever you are.',
      locked: 'Locked',
      essentials: [
        { name: 'Fridge', room: 'Kitchen', icon: 'fridge', watts: 120, dzd: 9 },
        { name: 'Freezer', room: 'Kitchen', icon: 'freezer', watts: 95, dzd: 7 },
        { name: 'Water pump', room: 'Outdoors', icon: 'waterPump', watts: 0, dzd: 3 },
        { name: 'Indoor lights', room: 'Living room', icon: 'lighting', watts: 40, dzd: 2 },
      ],
      secondary: [
        { name: 'Air conditioner', room: 'Living room', icon: 'ac', watts: 1450, dzd: 34 },
        { name: 'Oven', room: 'Kitchen', icon: 'oven', watts: 2200, dzd: 21 },
        { name: 'Water heater', room: 'Bathroom', icon: 'waterHeater', watts: 1800, dzd: 18 },
      ],
      total: 'Live total',
      on: 'On',
      off: 'Off',
      toggleLabel: 'Turn {name} on or off',
      extras: [
        { title: 'Away mode', body: 'The app offers it when the home looks empty, and tells you when the session lapses.' },
        { title: 'Schedules', body: 'Recurring on and off windows, set with a picker built for thumbs.' },
        { title: 'Household shedding', body: 'You choose which circuit yields first when the budget cap is reached.' },
      ],
      limit:
        'The relay switches eligible secondary circuits on a paired kit. It cannot disconnect your Sonelgaz supply, and anything marked P1 cannot be switched off from the app at all.',
    },

    loop: {
      eyebrow: 'REPORTS',
      title: 'A problem you report reaches somebody.',
      lead: 'You photograph it and send it. The report lands in the inbox of the operators who cover your wilaya, and every status change comes back to you.',
      steps: [
        { title: 'You report it', body: 'With photos, from the dashboard.' },
        { title: 'An operator acknowledges', body: 'Then triages and assigns the report.' },
        { title: 'An agent is dispatched', body: 'A work order is offered, accepted, tracked.' },
        { title: 'You are kept informed', body: 'The status changes for you when it changes for them.' },
      ],
    },

    providers: {
      eyebrow: 'FOR ENERGY PROVIDERS',
      title: 'The operator portal, from the wilaya down to the meter.',
      lead: 'Four roles, a geographic scope per account, and an audit row behind every write. The server intersects that scope with every request.',
      items: [
        {
          title: 'Network map',
          body: 'Aggregates per wilaya, then the households in one wilaya, then one household. Aggregates carry no coordinates, at any zoom level.',
        },
        {
          title: 'Reports and field work',
          body: 'The resident-report inbox, the acknowledge → triage → assign → resolve transitions, and the agent dispatch board beside them.',
        },
        {
          title: 'Public alerts',
          body: 'A composer with French and Arabic copy, geographic targeting, and a recipient count previewed before you publish.',
        },
        {
          title: 'Bill issuance',
          body: 'From the household panel, once it is established which household this is. The same invoice number twice against one household is refused.',
        },
      ],
      alarms: {
        title: 'Two distinctions that never blur',
        items: [
          {
            title: 'Leakage current is its own tier',
            body: 'Above “danger”. Current finding a path through plumbing, a damp wall, or a person is not an equipment risk. One dispatches a crew at normal pace; the other dispatches one now.',
          },
          {
            title: 'A home trip is not a grid outage',
            body: 'A trip means the household’s own protection opened and the crew should go to the house. An outage means supply is gone upstream and the crew should go to the substation. Conflating them sends a crew to the wrong place.',
          },
        ],
      },
      stat: {
        value: '21,828',
        unit: 'MW',
        label: 'national peak, summer 2026 — the fifth record of the season (Sonelgaz)',
      },
      roadmap:
        'Roadmap: peak analytics, load shedding and ESG reporting are designed and prototyped, with no service behind them yet.',
      cta: 'Request a portal demo',
    },

    trust: {
      eyebrow: 'TRUST',
      triad: ['Simple', 'Secure', 'Algerian'],
      title: 'What we refuse to claim.',
      items: [
        {
          title: 'An estimate stays an estimate',
          body: 'Your running total for the quarter is labelled an estimate everywhere it appears, and is never presented as a figure Sonelgaz has agreed.',
        },
        {
          title: 'A photograph is not a debt',
          body: 'What a camera thought it read and what Sonelgaz issued do not look alike on screen. The first is the weaker claim, and it is drawn as one.',
        },
        {
          title: 'Outside your scope: nothing',
          body: 'Asking for a wilaya outside your scope returns nothing, not an error — distinguishing the two would confirm that a region holds data to someone who may not see it.',
        },
        {
          title: '“Sent” is not “received”',
          body: 'A notification is recorded as attempted, not as received. They are different claims and the schema keeps them apart.',
        },
      ],
      extra: [
        'Your data stays in Algeria and is never shared without your consent.',
        'Three languages, with full RTL mirroring. A meter number still reads left to right.',
        'WCAG AA accessibility: states are never distinguished by colour alone.',
        'Electricity today. Water and gas tomorrow.',
      ],
    },

    faq: {
      eyebrow: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Everything you need to know before getting started',
      desc: 'Hardware, security, payment: answers to the questions that come up most.',
      items: [
        {
          q: 'Do I need hardware to start?',
          a: 'No. A phone and your paper bill are enough: photograph it, correct whatever the reader extracted, and follow your tranche and your estimate for the quarter. The kit adds real time per circuit and remote switching — it is not the price of entry.',
        },
        {
          q: 'Do I need a special meter?',
          a: 'No. The kit sits alongside your existing installation, using a metering module compatible with the usual Sonelgaz meters. In the large majority of cases no meter replacement is needed.',
        },
        {
          q: 'How do you know my Sonelgaz tranche?',
          a: 'TaQa Contrôle accumulates your consumption from the start of your billing quarter — from your readings, or from the kit’s measurement — and applies the household tariff in force, with its four progressive tranches. You see your exact position and the kWh left before the next tranche.',
        },
        {
          q: 'Can I pay my bill from the app?',
          a: `Yes. The app opens the Sonelgaz payment portal (${EPAYMENT_HOST}) and fills in the invoice number, the amount and the key from the bill on file. The payment happens on the Sonelgaz portal, not with us.`,
        },
        {
          q: 'Can TaQa Contrôle cut off my electricity?',
          a: 'No. The relay switches eligible secondary circuits on a paired kit — a water heater, an air conditioner. It cannot disconnect your Sonelgaz supply, and circuits you mark as critical cannot be switched off from the app at all. That is a design limit, not an omission.',
        },
        {
          q: 'Is my data secure?',
          a: 'Your data is hosted in Algeria and is never shared without your explicit consent. What a reader may do is resolved from their memberships of a home, not from an account-wide claim. You can export your data or request its deletion at any time.',
        },
        {
          q: 'Does the app work without a stable connection?',
          a: 'A profile and a home you have already opened stay visible offline. With a kit, measurement continues and uploads when the network returns. A very first run with no connection has nothing to show, and says so.',
        },
        {
          q: 'Can I manage several homes?',
          a: 'Yes. One account can hold several homes, each with its own plan, hardware and your role in it. A home is shared with your family as owner, admin or viewer, by invitations that expire.',
        },
      ],
    },

    finalCta: {
      title: 'Your next bill is already being written. Start reading it.',
      sub: 'Start with your paper bill today. The kit can come whenever you want it.',
      button: 'Start monitoring',
      secondary: 'For energy providers',
    },

    footer: {
      tagline: 'Visibility before the bill.',
      rights: 'All rights reserved.',
      devBy: 'Developed by',
      language: 'Language',
      backToTop: 'Back to top',
    },

    alt: {
      logo: 'TaQa Contrôle',
      heroPhone: 'The TaQa Contrôle app showing real-time consumption per circuit',
      dashboardScreen: 'TaQa Contrôle dashboard: consumption by circuit and by Sonelgaz tranche',
      bill: 'An electricity bill received at the end of the quarter',
      scan: 'A paper bill photographed in the app',
      anomaly: 'An alert flagging abnormal consumption on one circuit',
      budgetAlert: 'A notification that the monthly budget has been exceeded',
      peak: 'A chart showing a consumption peak',
      realtime: 'A real-time consumption curve',
      remote: 'A phone switching a circuit off remotely',
      switch: 'A connected switch controlling a circuit',
      co2: 'A carbon footprint expressed in kilograms of CO₂',
      map: 'A map of the network by wilaya',
    },

    a11y: {
      icon3dLabel: 'Animated illustration: {name}',
      chartLabel: 'Chart: {name}',
      reducedMotion: 'Reduced motion',
    },
  },

  ar: {
    meta: {
      locale: 'ar',
      ogLocale: 'ar_DZ',
      dir: 'rtl',
      title: 'طاقة كونترول — شاهد استهلاكك قبل أن تصلك الفاتورة',
      description:
        'صوّر فاتورة سونلغاز، وتابع شريحتك وهي تمتلئ، وادفع دون أن تخرج من التطبيق. وبإضافة العدّة: استهلاك لكل دائرة وتحكّم عن بُعد. صُمّم في الجزائر.',
      ogAlt: 'لوحة تحكّم طاقة كونترول: الاستهلاك حسب الدائرة وحسب شريحة سونلغاز',
      keywords:
        'فاتورة سونلغاز، شرائح سونلغاز، تصوير الفاتورة، دفع فاتورة سونلغاز، استهلاك الكهرباء الجزائر، قراءة العدّاد، متابعة الطاقة',
    },

    nav: {
      home: 'الرئيسية',
      problem: 'المشكلة',
      how: 'كيف يعمل',
      devices: 'الأجهزة',
      providers: 'المزوّدون',
      faq: 'الأسئلة الشائعة',
      cta: 'ابدأ المتابعة',
      menu: 'القائمة',
      close: 'إغلاق',
      language: 'اللغة',
    },

    hero: {
      eyebrow: 'راقب. افهم. وفّر.',
      h1: 'المشكلة ليست في فاتورتك، بل في أنك لا تراها قادمة.',
      h1Accent: 'لا تراها قادمة',
      sub: 'الفاتورة المرتفعة سببها استهلاك لا تراه. يُريك طاقة كونترول ما يستهلكه منزلك لحظة بلحظة، دائرةً بدائرة، ويُعلمك بشريحتك في تسعيرة سونلغاز، وينبّهك قبل أن تفاجئك الفاتورة.',
      proof: [
        'متابعة لحظية لكل دائرة',
        'تفصيل فاتورتك حسب الشرائح',
        'تنبيهات الذروة والأعطال والميزانية',
        'تحكّم في دوائرك عن بُعد',
      ],
      ctaPrimary: 'ابدأ المتابعة',
      ctaSecondary: 'لمزوّدي الطاقة',
      noKit: 'لا تملك العدّة؟ ابدأ بفاتورتك الورقية.',
      callouts: [
        { icon: 'gauge', tone: 'gold', value: '١٨ كيلوواط‑ساعة', label: 'قبل الشريحة الأغلى' },
        { icon: 'card', tone: 'green', value: '٧٩٦ دج', label: 'أُنفقت هذا الفصل' },
        { icon: 'leaf', tone: 'greenSoft', value: '١٤٧ كغ CO₂', label: '≈ ٨٠ شجرة لمدّة شهر' },
      ],
      meter: {
        label: 'هذا الفصل',
        unit: 'كيلوواط‑ساعة',
        cost: 'تقديري هذا الفصل',
        tranche: 'الشريحة',
        trancheNext: 'قبل الشريحة التالية',
        caught: 'تم إرسال تنبيه',
        caughtDesc: 'أنت تقترب من الشريحة الثالثة. بقي {n} كيلوواط‑ساعة.',
        live: 'مباشر',
      },
    },

    problem: {
      eyebrow: 'المشكلة الحقيقية',
      title: 'تأتي الفاتورة، بعد ثلاثة أشهر من فوات الأوان.',
      lead: 'تُقرأ عدّادك مرّة كل ثلاثة أشهر. إلى ذلك الحين أنت تُخمّن — وما تعتاده في جوان لا تدفعه إلا في سبتمبر.',
      cards: [
        {
          title: 'استهلاك لا تراه',
          body: 'لا تستطيع تحديد الجهاز المسؤول. يصلك مبلغ، ولا يصلك سبب أبدًا.',
          stat: '٩٠',
          statUnit: 'يومًا دون أي إشارة',
        },
        {
          title: 'قفزة الشريحة',
          body: 'تجاوز الشريحة الثانية يضاعف سعر الكيلوواط‑ساعة ٢٫٣٥ مرّة، ويرفع الرسم على القيمة المضافة من ٩٪ إلى ١٩٪.',
          stat: '×٢٫٣٥',
          statUnit: 'عند الكيلوواط‑ساعة ١٢٦',
        },
        {
          title: 'صيف مكلِف',
          body: 'منزل مكيّف يتجاوز ١٢٠٠ كيلوواط‑ساعة في فصل الصيف. وكل كيلوواط‑ساعة بعد ١٠٠٠ يُحتسب بـ ٥٫٤٨ دج.',
          stat: '٢١٨٢٨',
          statUnit: 'ميغاواط في الذروة الوطنية، صيف ٢٠٢٦',
        },
      ],
      footnote:
        'تسعيرة سونلغاز للمنازل، الرمز 54 M‎: أربع شرائح فصلية تصاعدية. أول ١٢٥ كيلوواط‑ساعة تبقى دائمًا بالتسعيرة الاجتماعية — ولا يتغيّر السعر إلا على ما يزيد عن كل حدّ. الذروة الوطنية: سونلغاز، صيف ٢٠٢٦.',
    },

    solution: {
      eyebrow: 'الرؤية',
      title: 'عدّاد يمكنك أخيرًا قراءته.',
      lead: 'موقعك بين شرائح سونلغاز الأربع، وما بقي لك قبل الشريحة التالية، وما تدين به فعلًا — محدَّثًا دون انتظار قراءة العدّاد.',
      pillars: [
        {
          title: 'اعرف شريحتك قبل أن تتجاوزها',
          body: 'سلّم الشرائح وأسعارها، وموقعك بدقّة، وما بقي من كيلوواط‑ساعة قبل الدرجة التالية.',
        },
        {
          title: 'تقدير فصلك، مفصّلًا',
          body: 'مجموع قراءاتك موزّعًا على الشرائح وعلى بنود الفاتورة. يُوصَف بأنه تقدير في كل موضع يظهر فيه، ولا يُقدَّم أبدًا كمبلغ أقرّته سونلغاز.',
        },
        {
          title: 'كل دائرة، لا المجموع فقط',
          body: 'مع العدّة: الإنارة والمقابس والمكيّف وسخّان الماء — لكل خط في لوحتك منحناه الخاص.',
        },
      ],
      tranches: {
        heading: 'فاتورتك موزّعة على شرائح سونلغاز الأربع',
        legend: ['الشريحة ١ — التسعيرة الاجتماعية', 'الشريحة ٢', 'الشريحة ٣', 'الشريحة ٤'],
        price: 'دج/كيلوواط‑ساعة',
        you: 'أنت هنا',
      },
    },

    modes: {
      eyebrow: 'طريقتان للبداية',
      title: 'لا تحتاج إلى أي جهاز لتبدأ.',
      lead: 'معظم المنازل تبدأ دون تركيب أي شيء. العدّة تضيف اللحظية والتحكّم — وليست شرطًا للدخول.',
      cards: [
        {
          badge: 'دون أجهزة',
          title: 'هاتفك وفاتورتك الورقية',
          body: 'صوّر فاتورة سونلغاز: تستخرج القراءة الآلية الحقول، فتصحّحها أنت، ثم تُحفَظ. أدخل قراءات عدّادك يدويًا وتابع شريحتك وتقدير فصلك.',
          points: [
            'تصوير الفاتورة، مع تصحيحك قبل أي حفظ',
            'قراءات يدوية وسجل فصلي',
            'سلّم الشرائح وتقدير مفصّل',
            'الدفع على بوّابة سونلغاز دون الخروج من التطبيق',
          ],
        },
        {
          badge: 'مع العدّة',
          title: 'وحدة القياس والتحكّم عن بُعد',
          body: 'تُثبّت وحدة على لوحتك الكهربائية، بقناة قياس لكل دائرة. فتنتقل من الفصل إلى الثانية، ويصبح بإمكانك التحكّم من أي مكان.',
          points: [
            'استهلاك مباشر، دائرةً بدائرة',
            'تفصيل حسب الجهاز حيث يستطيع العتاد تمييزه',
            'تشغيل وإطفاء الدوائر الثانوية عن بُعد',
            'سقف ميزانية يُطبَّق تلقائيًا',
          ],
        },
      ],
      note: 'المنزل بلا عدّة يرى نسخة صادقة من التطبيق، لا واجهة مثقوبة بخانات فارغة.',
    },

    how: {
      eyebrow: 'كيف يعمل',
      title: 'من فاتورتك الورقية إلى هاتفك، في أربع خطوات.',
      steps: [
        {
          title: 'تسجّل',
          body: 'رقم هاتف ورمز يصلك برسالة. تُسمّي منزلك وتُدخل رقم عدّادك.',
        },
        {
          title: 'تُغذّيه',
          body: 'صوّر فاتورة، أو أدخل قراءة. ومع العدّة يصل القياس وحده، كل ثانية ولكل دائرة.',
        },
        {
          title: 'تفهم',
          body: 'شريحتك، وما بقي قبل التالية، وتقدير فصلك مفصّلًا بندًا بندًا.',
        },
        {
          title: 'تتحكّم',
          body: 'ادفع على بوّابة سونلغاز دون الخروج من التطبيق. ومع العدّة، اقطع دائرة ثانوية من هاتفك.',
        },
      ],
    },

    features: {
      eyebrow: 'ما تحصل عليه',
      title: 'ستّة أمور لن تخبرك بها فاتورتك أبدًا.',
      items: [
        {
          title: 'فاتورتك، مصوَّرة',
          body: 'تستخرج القراءة الآلية الحقول وتصحّحها أنت قبل الحفظ. والتكرار يُنبّهك، ولا يمنعك.',
        },
        {
          title: 'الدفع دون البحث عن البوّابة',
          body: 'يفتح التطبيق بوّابة الدفع الخاصة بسونلغاز ويملأ رقم الفاتورة والمبلغ والمفتاح عنك. ولا يُعرض زر دفع على فاتورة مسدَّدة.',
        },
        {
          title: 'موقعك بين الشرائح',
          body: 'الشرائح الأربع وأسعارها، وموقعك، وما بقي من كيلوواط‑ساعة قبل الدرجة التالية.',
        },
        {
          title: 'فواتيرك بعيدًا عن صورك',
          body: '«فواتيري» تعرض ما أصدرته سونلغاز فقط. وتبقى صورك في السجل، على حدة.',
        },
        {
          title: 'التنبيهات والإبلاغ',
          body: 'حدود الميزانية والانقطاع وعودة التيار وفاتورة قاربت أجلها — مع ما ينشره المزوّد لولايتك، في قائمة واحدة.',
        },
        {
          title: 'منزلك، بالمشاركة',
          body: 'عدّة منازل في حساب واحد، ومشاركة المنزل مع عائلتك كمالك أو مشرف أو مُطالِع.',
        },
      ],
    },

    dashboard: {
      eyebrow: 'بوّابة المشغّل',
      title: 'غرفة التحكّم، على شاشة واحدة.',
      lead: 'البوّابة التي تراها فرق سونلغاز: خريطة الشبكة حسب الولاية، وصندوق بلاغات السكان، ومحرّر التنبيهات العامة، وسجل التدقيق. أربعة أدوار، ونطاق جغرافي لكل حساب.',
      bullets: [
        'خريطة الشبكة، ولايةً بولاية',
        'البلاغات: استلام، تصنيف، إحالة، حلّ',
        'تنبيهات عامة مع معاينة المستلمين',
        'سجل تدقيق خلف كل عملية كتابة',
      ],
      alt: 'بوّابة مشغّل طاقة كونترول: نظرة عامة على الشبكة، وخريطة حسب الولاية، ومنحنيات الحمل',
      hint: 'حرّك المؤشّر لإمالة الشاشة',
      caption:
        'صورة من البوّابة. مؤشّرات الحمل المعروضة هنا توضيحية: نطاق الشبكة مُنمذج ولم يُربط بعد (انظر خارطة الطريق).',
    },

    devices: {
      eyebrow: 'التحكّم',
      title: 'ما يمكنك قطعه — وما لا يمكنك.',
      support: 'أطفئ ما نسيته، أينما كنت.',
      remote: 'يُدار عن بُعد',
      essentialTitle: 'الأجهزة الأساسية',
      essentialNote: 'محميّة: لا تُقطع من التطبيق.',
      secondaryTitle: 'الأجهزة غير الأساسية',
      secondaryNote: 'القرار لك، من أي مكان.',
      locked: 'مقفل',
      essentials: [
        { name: 'الثلاجة', room: 'المطبخ', icon: 'fridge', watts: 120, dzd: 9 },
        { name: 'المجمّدة', room: 'المطبخ', icon: 'freezer', watts: 95, dzd: 7 },
        { name: 'مضخّة الماء', room: 'الخارج', icon: 'waterPump', watts: 0, dzd: 3 },
        { name: 'الإنارة الداخلية', room: 'الصالون', icon: 'lighting', watts: 40, dzd: 2 },
      ],
      secondary: [
        { name: 'المكيّف', room: 'الصالون', icon: 'ac', watts: 1450, dzd: 34 },
        { name: 'الفرن', room: 'المطبخ', icon: 'oven', watts: 2200, dzd: 21 },
        { name: 'سخّان الماء', room: 'الحمّام', icon: 'waterHeater', watts: 1800, dzd: 18 },
      ],
      total: 'المجموع المباشر',
      on: 'مشتغل',
      off: 'مطفأ',
      toggleLabel: 'تشغيل أو إطفاء {name}',
      extras: [
        { title: 'وضع الغياب', body: 'يقترحه التطبيق عندما يبدو المنزل فارغًا، ويُعلمك عند انتهاء الجلسة.' },
        { title: 'الجدولة', body: 'فترات تشغيل وإطفاء متكرّرة، تُضبط بلمسة إصبع.' },
        { title: 'تخفيف أحمال المنزل', body: 'تختار أي دائرة تتراجع أولًا عند بلوغ سقف الميزانية.' },
      ],
      limit:
        'يعمل المُرحّل على الدوائر الثانوية المؤهّلة في عدّة مقترنة. ولا يمكنه قطع تغذيتك من سونلغاز، وما صُنّف P1‎ لا يمكن قطعه من التطبيق إطلاقًا.',
    },

    loop: {
      eyebrow: 'الإبلاغ',
      title: 'ما تُبلّغ عنه يصل إلى جهة فعلية.',
      lead: 'تصوّر المشكلة وترسلها. يدخل البلاغ إلى صندوق المشغّلين الذين يغطّون ولايتك، ويعود إليك كل تغيّر في حالته.',
      steps: [
        { title: 'تُبلّغ', body: 'بالصور، من لوحة التحكّم.' },
        { title: 'يستلم المشغّل', body: 'ثم يصنّف البلاغ ويُحيله.' },
        { title: 'يُوفد عامل ميداني', body: 'يُعرض أمر عمل، ويُقبل، ويُتابَع.' },
        { title: 'تبقى على علم', body: 'تتغيّر الحالة عندك حين تتغيّر عندهم.' },
      ],
    },

    providers: {
      eyebrow: 'لمزوّدي الطاقة',
      title: 'بوّابة المشغّل، من الولاية إلى العدّاد.',
      lead: 'أربعة أدوار، ونطاق جغرافي لكل حساب، وسجل تدقيق خلف كل عملية كتابة. ويطابق الخادم هذا النطاق مع كل طلب.',
      items: [
        {
          title: 'خريطة الشبكة',
          body: 'مجاميع حسب الولاية، ثم منازل ولاية واحدة، ثم منزل واحد. والمجاميع لا تحمل أي إحداثيات، في أي مستوى تكبير.',
        },
        {
          title: 'البلاغات والعمل الميداني',
          body: 'صندوق بلاغات السكان، ومراحل الاستلام ← التصنيف ← الإحالة ← الحل، ولوحة توزيع العاملين بجانبها.',
        },
        {
          title: 'التنبيهات العامة',
          body: 'محرّر بنصّ فرنسي وعربي، واستهداف جغرافي، ومعاينة لعدد المستلمين قبل النشر.',
        },
        {
          title: 'إصدار الفواتير',
          body: 'من بطاقة المنزل، بعد أن يتحدّد أي منزل هذا. ورفض رقم الفاتورة نفسه مرّتين على المنزل نفسه.',
        },
      ],
      alarms: {
        title: 'تمييزان لا يختلطان أبدًا',
        items: [
          {
            title: 'تيار التسرّب مستوى قائم بذاته',
            body: 'فوق مستوى «الخطر». تيارٌ يجد طريقه عبر السباكة أو حائط رطب أو عبر إنسان ليس خطرًا على المعدّات. الأول يُرسل فرقة بالوتيرة المعتادة، والثاني يُرسلها الآن.',
          },
          {
            title: 'قاطع المنزل ليس انقطاعًا في الشبكة',
            body: 'فتح القاطع يعني أن حماية المنزل نفسها عملت وأن الفرقة يجب أن تتوجّه إلى البيت. أما الانقطاع فيعني أن التغذية مفقودة من الأعلى وأن الفرقة يجب أن تتوجّه إلى المحوّلة. وخلطهما يُرسل الفرقة إلى المكان الخطأ.',
          },
        ],
      },
      stat: {
        value: '٢١٨٢٨',
        unit: 'ميغاواط',
        label: 'الذروة الوطنية، صيف ٢٠٢٦ — الرقم القياسي الخامس في الموسم (سونلغاز)',
      },
      roadmap:
        'خارطة الطريق: تحليلات الذروة وتخفيف الأحمال وتقارير الأثر البيئي مُصمّمة ومُنمذجة، دون خدمة خلفية حتى الآن.',
      cta: 'اطلب عرضًا للبوّابة',
    },

    trust: {
      eyebrow: 'الثقة',
      triad: ['بسيط', 'آمن', 'جزائري'],
      title: 'ما نرفض أن نزعمه.',
      items: [
        {
          title: 'التقدير يبقى تقديرًا',
          body: 'مجموع فصلك يُوصَف بأنه تقدير في كل موضع يظهر فيه، ولا يُقدَّم أبدًا كمبلغ أقرّته سونلغاز.',
        },
        {
          title: 'الصورة ليست دَينًا',
          body: 'ما ظنّت الكاميرا أنها قرأته وما أصدرته سونلغاز لا يتشابهان على الشاشة. الأول ادّعاء أضعف، ويُرسم على هذا الأساس.',
        },
        {
          title: 'خارج نطاقك: لا شيء',
          body: 'طلب ولاية خارج نطاقك لا يُرجع شيئًا، لا خطأً — لأن التمييز بينهما يؤكّد لمن لا يحقّ له الاطّلاع أن تلك الجهة تحتوي بيانات.',
        },
        {
          title: '«أُرسل» ليس «وصل»',
          body: 'يُسجَّل الإشعار كمحاولة إرسال، لا كإشعار وصل. وهما ادّعاءان مختلفان، وبنية البيانات تفصل بينهما.',
        },
      ],
      extra: [
        'بياناتك تبقى في الجزائر ولا تُشارَك دون موافقتك.',
        'ثلاث لغات، مع انعكاس كامل في العربية. ويبقى رقم العدّاد مقروءًا من اليسار إلى اليمين.',
        'إمكانية وصول بمعيار WCAG AA‎: لا تُميَّز الحالات باللون وحده أبدًا.',
        'الكهرباء اليوم. الماء والغاز غدًا.',
      ],
    },

    faq: {
      eyebrow: 'الأسئلة الشائعة',
      title: 'كل ما تحتاج معرفته قبل البدء',
      desc: 'الأجهزة والأمان والدفع: إجابات عن الأسئلة الأكثر تداولًا.',
      items: [
        {
          q: 'هل أحتاج إلى أجهزة لأبدأ؟',
          a: 'لا. يكفي هاتف وفاتورتك الورقية: تصوّرها، وتصحّح ما استخرجته القراءة الآلية، ثم تتابع شريحتك وتقدير فصلك. والعدّة تضيف اللحظية لكل دائرة والتحكّم عن بُعد — وليست شرطًا للدخول.',
        },
        {
          q: 'هل أحتاج إلى عدّاد خاص؟',
          a: 'لا. تُركَّب العدّة إلى جانب تركيبتك الحالية، عبر وحدة قياس متوافقة مع عدّادات سونلغاز المعتادة. وفي الغالبية الكبرى من الحالات لا حاجة إلى استبدال العدّاد.',
        },
        {
          q: 'كيف تعرفون شريحتي عند سونلغاز؟',
          a: 'يجمع طاقة كونترول استهلاكك من بداية فصل الفوترة — من قراءاتك أو من قياس العدّة — ويطبّق تسعيرة المنازل السارية بشرائحها الأربع التصاعدية. فترى موقعك بدقّة وما بقي من كيلوواط‑ساعة قبل الشريحة التالية.',
        },
        {
          q: 'هل يمكنني دفع فاتورتي من التطبيق؟',
          a: `نعم. يفتح التطبيق بوّابة الدفع الخاصة بسونلغاز (‎${EPAYMENT_HOST}‎) ويملأ رقم الفاتورة والمبلغ والمفتاح من الفاتورة المحفوظة. ويجري الدفع على بوّابة سونلغاز، لا عندنا.`,
        },
        {
          q: 'هل يمكن لطاقة كونترول قطع الكهرباء عنّي؟',
          a: 'لا. يعمل المُرحّل على الدوائر الثانوية المؤهّلة في عدّة مقترنة — سخّان ماء أو مكيّف. ولا يمكنه قطع تغذيتك من سونلغاز، والدوائر التي تصنّفها حسّاسة لا يمكن قطعها من التطبيق إطلاقًا. هذا قيد في التصميم، لا سهو.',
        },
        {
          q: 'هل بياناتي آمنة؟',
          a: 'تُستضاف بياناتك في الجزائر ولا تُشارَك أبدًا دون موافقتك الصريحة. وتُحدَّد صلاحيات المُطالِع من عضويّاته في المنزل، لا من صلاحية عامة في حسابه. ويمكنك تصدير بياناتك أو طلب حذفها في أي وقت.',
        },
        {
          q: 'هل يعمل التطبيق دون اتصال مستقر؟',
          a: 'يبقى الملف الشخصي والمنزل الذي فتحته سابقًا معروضين دون اتصال. ومع العدّة يتواصل القياس ويُرفع عند عودة الشبكة. أما أول تشغيل دون اتصال فلا شيء لديه ليعرضه، ويقول ذلك صراحةً.',
        },
        {
          q: 'هل يمكنني إدارة عدّة منازل؟',
          a: 'نعم. يمكن للحساب الواحد أن يحمل عدّة منازل، لكل منها عرضه وأجهزته ودورك فيه. ويُشارَك المنزل مع عائلتك كمالك أو مشرف أو مُطالِع، بدعوات محدّدة المدّة.',
        },
      ],
    },

    finalCta: {
      title: 'فاتورتك القادمة تُكتب الآن. ابدأ بقراءتها.',
      sub: 'ابدأ بفاتورتك الورقية اليوم. والعدّة تأتي وقت ما تشاء.',
      button: 'ابدأ المتابعة',
      secondary: 'لمزوّدي الطاقة',
    },

    footer: {
      tagline: 'الرؤية قبل الفاتورة.',
      rights: 'جميع الحقوق محفوظة.',
      devBy: 'من تطوير',
      language: 'اللغة',
      backToTop: 'إلى الأعلى',
    },

    alt: {
      logo: 'طاقة كونترول',
      heroPhone: 'تطبيق طاقة كونترول يعرض الاستهلاك اللحظي لكل دائرة',
      dashboardScreen: 'لوحة تحكّم طاقة كونترول: الاستهلاك حسب الدائرة وحسب شريحة سونلغاز',
      bill: 'فاتورة كهرباء تصل في نهاية الفصل',
      scan: 'فاتورة ورقية مصوَّرة داخل التطبيق',
      anomaly: 'تنبيه يرصد استهلاكًا غير طبيعي في إحدى الدوائر',
      budgetAlert: 'إشعار بتجاوز الميزانية الشهرية',
      peak: 'رسم بياني يُظهر ذروة استهلاك',
      realtime: 'منحنى استهلاك لحظي',
      remote: 'هاتف يقطع دائرة عن بُعد',
      switch: 'مفتاح متصل يتحكّم في دائرة',
      co2: 'بصمة كربونية بالكيلوغرام من ثاني أكسيد الكربون',
      map: 'خريطة الشبكة حسب الولاية',
    },

    a11y: {
      icon3dLabel: 'رسم متحرّك: {name}',
      chartLabel: 'رسم بياني: {name}',
      reducedMotion: 'حركة مخفّفة',
    },
  },
};

export const LANGUAGES = [
  { code: 'fr', label: 'Français', short: 'FR', dir: 'ltr' },
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'ar', label: 'العربية', short: 'AR', dir: 'rtl' },
];

export const DEFAULT_LANG = 'fr';
export const RTL_LANGS = ['ar'];
