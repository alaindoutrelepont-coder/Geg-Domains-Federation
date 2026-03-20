export interface StepLink {
  label: string;
  url: string;
  index?: number;
}

export interface Step {
  title: string;
  description: string;
  details: string[];
  tips?: string[];
  warning?: string;
  warningLink?: { label: string; url: string };
  links?: StepLink[];
}

export interface Phase {
  id: string;
  title: string;
  icon: string;
  steps: Step[];
}

export const PHASES: Phase[] = [
  {
    id: 'env-setup',
    title: 'Phase 1 : Ouvrir un Google Workspace pour l\'Education',
    icon: 'Settings',
    steps: [
      {
        title: 'Enregistrement et Vérification du Domaine',
        description: 'Établir la présence de votre organisation chez Google.',
        details: [
          'Suivez l\'étape deux du menu "Ouvrir un workspace"'
        ],
        links: [
          {
            label: 'Ouvrir un workspace',
            url: 'https://sites.google.com/geg-fwb.be/geg-fwb/ouvir-un-workspace?authuser=0'
          }
        ],
        warning: 'Si vous recevez un message disant "Ce domaine est déjà utilisé", ouvrez un ticket en complétant ',
        warningLink: {
          label: 'ce formulaire',
          url: 'https://toolbox.googleapps.com/apps/recovery/domain_in_use?visit_id=638792873469123919-2257290525&rd=1'
        }
      },
      {
        title: 'Architecture Organisationnelle',
        description: 'Définir la structure de base de votre console Google.',
        details: [
          'Choisissez le bon type d\'organisation (Enseignement primaire/secondaire ou Enseignement supérieur) dans les paramètres du compte',
          'Créez des Unités Organisationnelles (UO) pour séparer le Personnel des Élèves (ex: /Profs, /Élèves).'
        ],
        links: [
          {
            label: 'Paramètres du compte',
            url: 'https://admin.google.com/ac/accountsettings/profile',
            index: 0
          },
          {
            label: 'Unités Organisationnelles',
            url: 'https://admin.google.com/ac/orgunits?journey=218',
            index: 1
          }
        ]
      }
    ]
  },
  {
    id: 'identity',
    title: 'Phase 2 : Gestion des Utilisateurs et Identité',
    icon: 'Users',
    steps: [
      {
        title: 'Directory Sync (Synchronisation Cloud)',
        description: 'Synchronisez automatiquement vos utilisateurs Entra ID vers Google.',
        details: [
          'Allez dans Annuaire > Synchronisation des annuaires dans la console Google Admin.',
          'Ajoutez un répertoire "Microsoft Azure Active Directory".',
          'Autorisez la connexion avec un compte Administrateur Global Microsoft.',
          'Configurez le mappage des attributs (UPN -> Email Google, givenName -> Prénom, etc.).',
          'Lancez une synchronisation simulée avant d\'activer la synchro réelle.'
        ],
        links: [
          {
            label: 'Synchronisation des annuaires',
            url: 'https://admin.google.com/ac/sync/externaldirectories?journey=218',
            index: 0
          }
        ],
        tips: [
          'Utilisez la version Cloud pour éviter d\'installer un agent local.',
          'Les mots de passe ne sont pas synchronisés ; le SSO s\'en chargera.'
        ]
      },
      {
        title: 'Configuration du SSO (OIDC)',
        description: 'Permettez aux utilisateurs de se connecter avec leurs identifiants Microsoft.',
        details: [
          'Sécurité > Authentification > SSO avec un IdP tiers.',
          'Ajoutez un profil SSO et choisissez l\'option pré-intégrée "Microsoft Entra ID (OIDC)".',
          'Assignez ce profil aux UO concernées (Profs, Élèves).',
          'Testez la connexion via une fenêtre de navigation privée sur drive.google.com.'
        ]
      },
      {
        title: 'Mappage Technique des Attributs',
        description: 'Détails de la correspondance entre Entra ID et Google.',
        details: [
          'userPrincipalName → Email Google (Identifiant principal)',
          'givenName → Prénom',
          'surname → Nom',
          'department → Niveau scolaire / Année (pour le placement en UO)',
          'jobTitle → Classe / Fonction'
        ],
        tips: [
          'Le mappage correct du département permet d\'automatiser le placement dans les bonnes Unités Organisationnelles.'
        ]
      }
    ]
  },
  {
    id: 'services',
    title: 'Phase 3 : Configuration des Services (IA)',
    icon: 'Cpu',
    steps: [
      {
        title: 'Restriction des Services',
        description: 'Configurez un environnement focalisé sur l\'IA si nécessaire.',
        details: [
          'Désactivez les services inutilisés (Gmail, Calendar) si vous restez sur Microsoft pour ces outils.',
          'Gardez Google Drive activé (requis pour les Gems et le partage de fichiers dans Gemini).',
          'Activez Gemini for Education et NotebookLM pour les UO cibles.'
        ]
      },
      {
        title: 'Sécurité des Mineurs',
        description: 'Appliquez des règles strictes pour les élèves de moins de 18 ans.',
        details: [
          'Désactivez le partage vers l\'extérieur pour l\'UO des élèves.',
          'Bloquez la réception de fichiers externes.',
          'Masquez les élèves de l\'annuaire global pour protéger leur vie privée.'
        ]
      }
    ]
  }
];

export const BENEFITS = [
  {
    title: 'Identité Unique (SSO)',
    description: 'Un seul mot de passe (Microsoft) pour tout. Moins de support, plus de simplicité.'
  },
  {
    title: 'Gestion Automatisée',
    description: 'L\'ajout ou la suppression d\'un compte dans Microsoft est répercuté instantanément dans Google.'
  },
  {
    title: 'Sécurité des Mineurs',
    description: 'Placement automatique dans des UO protégées avec des règles de partage strictes.'
  },
  {
    title: 'Conformité RGPD',
    description: 'Contrôle total sur la visibilité des données et l\'accès aux outils d\'IA.'
  }
];
