// Types spécifiques pour décrire les comportements des champs du formulaire
interface AutocompleteField {
  type: 'autocomplete';
  label: string;
  options: string[]; // Options disponibles pour l'autocomplete
}

interface InputField {
  type: 'input';
  label: string;
  placeholder?: string; // Optionnel, texte affiché quand le champ est vide
  inputType?: string; // Nouveau, pour gérer les différents types d'input HTML
}

interface CheckboxField {
  type: 'checkbox';
  label: string;
  options: string[]; // Options disponibles pour les checkboxes
}

// Type union pour un champ de formulaire
export type FormField = AutocompleteField | InputField | CheckboxField;

// Modèle de formulaire comme un objet mock
export const formTemplate: FormField[] = [
  {
    type: 'autocomplete',
    label: 'Application',
    options: ['Intérieure', 'Extérieure', 'Autre']
  },
  {
    type: 'autocomplete',
    label: 'Brillance',
    options: ['Mate', 'Satinée', 'Brillante']
  },
  {
    type: 'input',
    label: 'Rendement m²/L par couche',
    placeholder: '10m'
  },
  {
    type: 'autocomplete',
    label: 'Diluant',
    options: ['Eau', 'Huile', 'Aucun']
  },
  {
    type: 'checkbox',
    label: 'Conditionnement',
    options: ['1L', '2L', '5L', '10L']
  },
];
