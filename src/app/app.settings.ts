export const appSettings = {
  // =============== Global Validations ===============
  EMAIL_REG_EXP: /^[^<>()[\]\\,;:\%#^\s@\"$&№*/~{}'|`+=!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/,
  DECIMAL_UPTO_100_REG_EXP: /^[0-9]{1,2}(\.[0-9]{1})?$/,
  DECIMAL_REG_EXP: /^[0-9]*(\.[0-9]{2})?$/,
  DECIMAL_REG_EXP_2: /^[0-9]*(\.[0-9])?$/,
  DECIMAL_REG_EXP_3: /^[0-9]*(\.[0-9]{1,2})?$/,
  DECIMAL_REG_EXP_4: /^(-)?[0-9]*(\.[0-9]{1,2})?$/,
  DECIMAL_REG_EXP_5: /^([0-9]{1,5})(\.[0-9]{1,2})?$/,
  PASSWORD_REG_EXP: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W_])(?=.{8,})/,
  PASSWORD_NO_LENGTH_REG_EXP: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W_])/,
  DATE_REG_EXP: /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19[4-9][0-9])|(20(0[0-9])|(1[0-7]))$/,
  NUMBER_ONLY_REG_EXP: /^[0-9]*$/,
  NUMBER_POINT_REG_EXP: /^[0-9.]*$/,
  NUMBER_AND_SLASH_REG_EXP: /^[0-9\/]*$/,
  NUMBER_AND_DASH_REG_EXP: /^([0-9+/-]*$)/,
  IMAGE_TYPES: ['image/jpeg', 'image/png'],
  FILE_TYPES: ['image/jpeg', 'image/png', 'application/pdf'],
  FILE_EXCEL_TYPES: ['.csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
  FILE_EXCEL_AND_WORD_TYPES: ['.csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel' , 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ERROR_MESSAGE: 'Something went wrong',
  MAX_FIlE_SIZE_500KB: 512000, // 500KB
  MAX_FIlE_SIZE_10MB: 10485760, // 10MB
  // =============== APP Global Configs ===============
  SUCCESS_RESPONSE: 200,
  DOCUMENTS_PROGRESS_TOTAL_POINTS: 33,
  DEFAULT_LANGUAGE: 'en',
  DEFAULT_CURRENCY: 'USD',
  DEFAULT_COUNTRY: 'Tanzania',
  ERROR_VARIABLE: '_ERROR_',
  NINE_DIGITS_MAX_NUMBER: 999999999.99,
  NINE_DIGITS_MIN_NUMBER: -999999999.99,
  DEFAULT_MAX_NUMBER: 999999999999.99,
  DEFAULT_EXTRA_MAX_NUMBER: 99999999999999999999.99,
  ENGLISH_ALPHABET_COUNT: 26,
  COLORS: ['#ae2323', '#ff6500', '#00746b', '#003c3e', '#6fbfb8', '#6a9698', '#c5cadf', '#7c0000', '#444444', '#FF0F00', '#FF9E01',
    '#FCD202', '#F8FF01', '#B0DE09', '#04D215', '#0D8ECF', '#0D52D1', '#2A0CD0', '#8A0CCF', '#CD0D74', '#754DEB', '#DDDDDD', '#999999',
    '#333333', '#000000', '#57032A', '#CA9726', '#990000', '#4B0C25']
};

/* *******************  -- DON'T TOUCH --  ******************* */

const siteMap = {
  // crm_module
  1: {
    // individual_customers_submodule
    100: {
      500: 'customers_list',
      501: 'payments_tab',
      502: 'personal_tab',
      503: 'rental_and_deposit',
      504: 'education',
      505: 'termination',
      506: 'comments',
      507: 'guarantors_tab',
      508: 'work_experience',
      509: 'documents',
      535: 'status_tab',
      552: 'penalties',
      553: 'accidents',
    },
    // corporate_customers_submodule
    101: {
      510: 'corp_customers_list',
      511: 'corp_personal_tab',
    },
    // guarantors_submodule
    102: {
      512: 'guarantors_list',
      513: 'guarantor_info',
      536: 'documents',
      537: 'related_customers',
    },
    // contracts
    119: {
      571: 'contract_summary',
      572: 'payments',
      573: 'general_terms',
      574: 'customer_information',
      575: 'customer_documents',
      576: 'contract_documents',
      577: 'charges_and_benefits',
      578: 'vehicles',
      579: 'guarantors',
      580: 'termination',
      581: 'contact_history',
      582: 'contact_closure',
      583: 'notes',
    }
  },
  // fleet_module
  2: {
    // fleets_submodule
    103: {
      514: 'fleet_list',
      533: 'vehicle_file',
      515: 'sticker',
      516: 'tracking',
      548: 'service-entry',
    },
    // service_entries_submodule
    109: {
      541: 'entries_list',
      542: 'entry_tab',
    },
    // shipments_submodule
    107: {
      540: 'shipments_list',
      543: 'summery',
      544: 'export',
      545: 'import',
      546: 'vehicles',
    },
    // penalties_submodule
    104: {
      517: 'penalties_list',
      518: 'penalties_info',
    },
    // suppliers_submodule
    108: {
      538: 'suppliers_list',
      539: 'suppliers_info',
    },
    // accidents_submodule
    105: {},
    // stickers_submodule
    106: {},
  },
  // finance_module
  3: {
    // rates_submodule
    110: {
      519: 'rates',
    }
  },
  // reporting_module
  4: {
    // crm_reports submodule
    115: {
      520: 'operator_payment_report',
      562: 'individual_customer_debt_report',
    },
    // financial_reports submodule
    116: {
      564: 'financial_overview',
      565: 'income_statement',
      566: 'roi_reports',
      567: 'collection_rate',
      568: 'vehicle_utilization_ratio',
      569: 'revenue_cost_and_gross_profit',
    },
    // fleet_reports submodule
    117: {
      563: 'weekly_commute_report',
    },
    // overview_reports submodule
    118: {
      554: 'crm_report',
      555: 'monthly_revenue',
      556: 'collection_rate',
      557: 'overdue_payments',
      558: 'fleet_management',
      559: 'gps_data',
      560: 'revenue',
      561: 'consolidated_collection_rate',
    }
  },
  // administration_module
  5: {
    521: 'general_company_profile',
    522: 'user_management',
    523: 'gps_trackers',
    // crm_list submodule
    112: {
      548: 'other'
    },
    // fleet_list submodule
    113: {
      524: 'vehicle_brands_and_models',
      550: 'other'
    },
    525: 'sticker_types',
    526: 'deleted_customers',
    527: 'deleted_vehicles',
    528: 'roles_and_permissions',
    529: 'countries_and_currencies',
    // finance submodule
    114: {
      530: 'categories',
    },
    531: 'document_types',
    532: 'branches',
    534: 'deleted_corp_customers',
    547: 'vehicle_expenditures',
  },
  // dashboard_module
  6: {},
};

