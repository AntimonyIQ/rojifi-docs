export type DocStatus = 'DEV' | 'PRODUCTION';
export type DocTabId = 'guides' | 'api-reference' | 'sdks' | 'changelog';

export interface CodeSnippet {
    language: string;
    code: string;
    runnable?: boolean;
    output?: string;
}

export interface EnumValue {
    name: string;
    value: string | number;
    description: string;
}

export interface DocEnum {
    name: string;
    description?: string;
    values: EnumValue[];
}

export interface DocSectionContent {
    type: 'text' | 'code' | 'enum' | 'alert' | 'endpoint';
    content?: string;
    variant?: 'info' | 'warning' | 'danger' | 'success';
    codeSnippet?: CodeSnippet;
    enumData?: DocEnum;
    endpointData?: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
        path: string;
        description?: string;
    };
}

export interface DocPage {
    id: string; // URL slug
    title: string;
    description: string;
    status: DocStatus;
    content: DocSectionContent[];
    hidden?: boolean;
}

export interface DocCategory {
    title: string;
    pages: DocPage[];
}

export interface DocVersion {
    version: string; // e.g., "v1"
    isLatest: boolean;
    tabs: {
        [key in DocTabId]?: DocCategory[];
    };
}

export const DOCS_DATA: DocVersion[] = [
    {
        version: 'v1',
        isLatest: true,
        tabs: {
            guides: [
                {
                    title: 'Introduction',
                    pages: [
                        {
                            id: 'introduction',
                            title: 'Documentation',
                            description: 'Welcome to Rojifi Documentation',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'Explore Rojifi’s API documentation to integrate powerful financial infrastructure into your product. We provide tools for stablecoin settlements, banking, and crypto wallets.',
                                },
                            ],
                        },
                        {
                            id: 'authentication',
                            title: 'Authentication',
                            description: 'Authenticate your API requests.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'Rojifi uses API keys to allow access to the API. You can register a new API key at our [developer portal](https://dashboard.rojifi.com).\n\nAuthentication to the API is performed via HTTP Basic Auth. Provide your API key as the basic auth username value. You do not need to provide a password.',
                                },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'bash',
                                        code: 'curl https://api.rojifi.com/v1/customers \\n  -u <YOUR_API_KEY>:',
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'Webhooks',
                    pages: [
                        {
                            id: 'webhooks-overview',
                            title: 'Overview',
                            description: 'Listen for events on your Rojifi account.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'You can configure webhook endpoints via the API or Dashboard to be notified about events that happen in your Rojifi account or connected accounts.',
                                },
                            ],
                        },
                        {
                            id: 'webhooks-events',
                            title: 'Events',
                            description: 'List of event types you can subscribe to.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'Rojifi sends events for a variety of resource changes. Below are common event types:\n\n- `payment.succeeded`\n- `payment.failed`\n- `customer.created`\n- `wallet.updated`',
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'Stable OS',
                    pages: [
                        {
                            id: 'onboarding-customers',
                            title: 'Onboarding Customers',
                            description: 'How to onboard new customers to Rojifi.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'Before you can create wallets or process payments for a user, you must onboard them as a Customer. This ensures compliance with KYC/KYB regulations.',
                                },
                            ],
                        },
                        {
                            id: 'onboarding-links',
                            title: 'Onboarding links for New Customers',
                            description: 'Generate hosted onboarding links.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'Use our hosted onboarding flow to collect KYC information securely. Generate a unique link via the API and redirect your user.',
                                },
                                {
                                    type: 'endpoint',
                                    endpointData: {
                                        method: 'POST',
                                        path: '/v1/onboarding/links',
                                        description: 'Create an onboarding link',
                                    },
                                },
                            ],
                        },
                        {
                            id: 'crypto-wallet',
                            title: 'Crypto Wallet',
                            description: 'Managing crypto wallets.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'Rojifi allows you to create deposit addresses for your customers on multiple blockchains.',
                                },
                            ],
                        },
                        {
                            id: 'pobo-swift-payment',
                            title: 'POBO SWIFT Payment',
                            description: 'Payments On Behalf Of (POBO) via SWIFT.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'Execute SWIFT payments where the sender appears as your customer rather than Rojifi. This is crucial for B2B settlements.',
                                },
                            ],
                        },
                        {
                            id: 'compliance',
                            title: 'Compliance and Legal Disclaimers',
                            description: 'Important compliance information.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'Rojifi is committed to following all applicable laws and regulations managed by FinCEN and other regulatory bodies. Please review our terms of service.',
                                },
                                {
                                    type: 'alert',
                                    variant: 'warning',
                                    content: 'Services may be restricted in certain jurisdictions.',
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'What We Support',
                    pages: [
                        {
                            id: 'stablecoins-blockchains',
                            title: 'Stablecoins and Blockchains',
                            description: 'Supported assets and networks.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'We currently support USDC and USDT across Ethereum, Polygon, and Solana networks.',
                                },
                            ],
                        },
                        {
                            id: 'settlement-currencies',
                            title: 'Settlement Currencies',
                            description: 'Fiat currencies supported for settlement.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'Settlements can be made in USD, EUR, GBP, and SGD via SWIFT or SEPA.',
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'Use Cases',
                    pages: [
                        {
                            id: 'swift-payments-use-case',
                            title: 'SWIFT Payments on Behalf of Customers',
                            description: 'Real-world example of POBO.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'Learn how to structure a flow where a user deposits crypto, converts to fiat, and sends a wire to a vendor, all appearing to come from the user.',
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'Additional Resources',
                    pages: [
                        {
                            id: 'state-codes',
                            title: 'State (Country Subdivision) Codes',
                            description: 'ISO codes for states and provinces.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'text',
                                    content:
                                        'When providing address information for KYC, please use the standard ISO 3166-2 subdivision codes.',
                                },
                            ],
                        },
                    ],
                },
            ],
            'api-reference': [
                {
                    title: 'Stable OS',
                    pages: [
                        {
                            id: 'stable-os-overview',
                            title: 'Overview',
                            description: 'Introduction to Stable OS resources.',
                            status: 'PRODUCTION',
                            content: [
                                { type: 'text', content: 'Stable OS provides the core primitives for your financial applications.' }
                            ]
                        }
                    ]
                },
                {
                    title: 'Current Tenant',
                    pages: [
                        {
                            id: 'get-current-tenant',
                            title: 'Get Current Tenant',
                            description: 'Retrieve information about the current tenant.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/tenant', description: 'Get current tenant details' }
                                }
                            ]
                        },
                        {
                            id: 'get-webhooks-config',
                            title: 'Get Webhooks Configuration',
                            description: 'Retrieve current webhooks configuration.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/tenant/webhooks', description: 'Get webhooks configuration' }
                                }
                            ]
                        },
                        {
                            id: 'update-webhooks-config',
                            title: 'Update Webhooks Configuration',
                            description: 'Update webhooks configuration.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'PATCH', path: '/v1/tenant/webhooks', description: 'Update webhooks configuration' }
                                }
                            ]
                        },
                        {
                            id: 'get-balances',
                            title: 'Get Balances',
                            description: 'Retrieve tenant balances.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/tenant/balances', description: 'Get balances' }
                                }
                            ]
                        },
                        {
                            id: 'get-crypto-deposit-instructions',
                            title: 'Get Crypto Deposit Instructions',
                            description: 'Get instructions for crypto deposits.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/tenant/deposit_instructions', description: 'Get crypto deposit instructions' }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Customer',
                    pages: [
                        {
                            id: 'generate-onboarding-link',
                            title: 'Generate Onboarding Link',
                            description: 'Generate a hosted onboarding link for a customer.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'POST', path: '/v1/customers/{id}/onboarding_link', description: 'Generate onboarding link' }
                                }
                            ]
                        },
                        {
                            id: 'create-customer',
                            title: 'Create New Customer',
                            description: 'Register a new customer.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'POST', path: '/v1/customers', description: 'Create new customer' }
                                }
                            ]
                        },
                        {
                            id: 'get-all-customers',
                            title: 'Get All Customers',
                            description: 'Retrieve a list of all customers.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/customers', description: 'List all customers' }
                                }
                            ]
                        },
                        {
                            id: 'update-customer',
                            title: 'Update Customer',
                            description: 'Update an existing customer.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'PUT', path: '/v1/customers/{id}', description: 'Update customer details' }
                                }
                            ]
                        },
                        {
                            id: 'delete-customer',
                            title: 'Delete Customer',
                            description: 'Remove a customer.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'DELETE', path: '/v1/customers/{id}', description: 'Delete a customer' }
                                }
                            ]
                        },
                        {
                            id: 'get-customer',
                            title: 'Get Single Customer',
                            description: 'Retrieve details of a specific customer.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/customers/{id}', description: 'Get customer details' }
                                }
                            ]
                        },
                        {
                            id: 'associated-persons',
                            title: 'Associated Persons',
                            description: 'Manage persons associated with a business customer.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/customers/{id}/associated_persons', description: 'List associated persons' }
                                }
                            ]
                        },
                        {
                            id: 'associated-entities',
                            title: 'Associated Entities',
                            description: 'Manage entities associated with a customer.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/customers/{id}/associated_entities', description: 'List associated entities' }
                                }
                            ]
                        },
                        {
                            id: 'documents',
                            title: 'Documents',
                            description: 'Upload and manage KYC/KYB documents.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'POST', path: '/v1/documents', description: 'Upload a document' }
                                }
                            ]
                        },
                        {
                            id: 'complete-customer-creation',
                            title: 'Complete Creation Request',
                            description: 'Finalize the customer creation process.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'POST', path: '/v1/customers/{id}/complete', description: 'Complete customer creation' }
                                }
                            ]
                        }
                    ],
                },
                {
                    title: 'Simulations',
                    pages: [
                        {
                            id: 'change-customer-status',
                            title: 'Change Customer Status',
                            description: 'Simulate a change in customer KYC status.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'POST', path: '/v1/simulations/customers/{id}/status', description: 'Change customer status' }
                                }
                            ]
                        },
                        {
                            id: 'mint-usdc',
                            title: 'Mint Rojifi USDC',
                            description: 'Mint Rojifi USDC tokens to a specified address for testing.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'POST', path: '/v1/simulations/mint/usdc', description: 'Mint Rojifi USDC' }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Exchange Rates',
                    pages: [
                        {
                            id: 'get-exchange-rates',
                            title: 'Get Exchange Rates',
                            description: 'Get live exchange rates.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/exchange_rates', description: 'Get exchange rates' }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Lists',
                    pages: [
                        {
                            id: 'get-countries',
                            title: 'Get List of Countries',
                            description: 'Retrieve a list of supported countries.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/lists/countries', description: 'Get countries list' }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Wallets',
                    pages: [
                        {
                            id: 'create-wallet',
                            title: 'Create a New Wallet',
                            description: 'Create a new digital wallet.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'POST', path: '/v1/wallets', description: 'Create a new wallet' }
                                }
                            ]
                        },
                        {
                            id: 'get-all-wallets',
                            title: 'Get All Wallets',
                            description: 'Retrieve a list of all wallets.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/wallets', description: 'List all wallets' }
                                }
                            ]
                        },
                        {
                            id: 'get-wallet',
                            title: 'Get Single Wallet',
                            description: 'Retrieve details of a specific wallet by ID.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/wallets/{id}', description: 'Get wallet details' }
                                }
                            ]
                        },
                        {
                            id: 'get-wallet-balances',
                            title: 'Get Wallet Balances',
                            description: 'Retrieve the balances of a specific wallet.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/wallets/{id}/balances', description: 'Get wallet balances' }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'External Accounts',
                    pages: [
                        {
                            id: 'create-external-account',
                            title: 'Create External Account',
                            description: 'Add a new bank account or crypto address.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'POST', path: '/v1/external_accounts', description: 'Create external account' }
                                }
                            ]
                        },
                        {
                            id: 'update-external-account',
                            title: 'Update External Account',
                            description: 'Update an existing external account.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'PUT', path: '/v1/external_accounts/{id}', description: 'Update external account' }
                                }
                            ]
                        },
                        {
                            id: 'get-all-external-accounts',
                            title: 'Get All External Accounts',
                            description: 'Retrieve a list of all external accounts.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/external_accounts', description: 'List external accounts' }
                                }
                            ]
                        },
                        {
                            id: 'get-external-account',
                            title: 'Get Single External Account',
                            description: 'Retrieve details of a specific external account.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/external_accounts/{id}', description: 'Get external account details' }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Transfers',
                    pages: [
                        {
                            id: 'create-transfer',
                            title: 'Create a Transfer',
                            description: 'Initiate a new transfer.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'POST', path: '/v1/transfers', description: 'Create transfer' }
                                }
                            ]
                        },
                        {
                            id: 'calculate-transfer-quote',
                            title: 'Calculate Transfer Quote',
                            description: 'Get a quote for a potential transfer.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'POST', path: '/v1/transfers/quote', description: 'Calculate quote' }
                                }
                            ]
                        },
                        {
                            id: 'create-internal-transfer',
                            title: 'Create Internal Transfer',
                            description: 'Transfer funds between your own wallets.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'POST', path: '/v1/transfers/internal', description: 'Create internal transfer' }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Transactions',
                    pages: [
                        {
                            id: 'get-all-transactions',
                            title: 'Get All Transactions',
                            description: 'Retrieve a history of all transactions.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/transactions', description: 'List transactions' }
                                }
                            ]
                        },
                        {
                            id: 'get-transaction',
                            title: 'Get Single Transaction',
                            description: 'Retrieve details of a specific transaction.',
                            status: 'PRODUCTION',
                            content: [
                                {
                                    type: 'endpoint',
                                    endpointData: { method: 'GET', path: '/v1/transactions/{id}', description: 'Get transaction details' }
                                }
                            ]
                        }
                    ]
                }
            ],
            sdks: [
                {
                    title: 'Server-side SDKs',
                    pages: [
                        {
                            id: 'node',
                            title: 'Node.js',
                            description: 'Official Rojifi Node.js SDK',
                            status: 'PRODUCTION',
                            content: [
                                { type: 'text', content: 'The Rojifi Node.js library provides convenient access to the Rojifi API from applications written in server-side JavaScript.\n\n### Installation' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'bash',
                                        code: 'npm install rojifi'
                                    }
                                },
                                { type: 'text', content: '### Usage' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'javascript',
                                        code: "const Rojifi = require('rojifi');\nconst rojifi = new Rojifi('sk_test_...');\n\nconst customers = await rojifi.customers.list();"
                                    }
                                }
                            ]
                        },
                        {
                            id: 'python',
                            title: 'Python',
                            description: 'Official Rojifi Python SDK',
                            status: 'PRODUCTION',
                            content: [
                                { type: 'text', content: 'The Rojifi Python library provides convenient access to the Rojifi API from applications written in the Python language.\n\n### Installation' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'bash',
                                        code: 'pip install rojifi'
                                    }
                                },
                                { type: 'text', content: '### Usage' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'python',
                                        code: "import rojifi\n\nrojifi.api_key = 'sk_test_...'\n\ncustomers = rojifi.Customer.list()"
                                    }
                                }
                            ]
                        },
                        {
                            id: 'php',
                            title: 'PHP',
                            description: 'Official Rojifi PHP SDK',
                            status: 'PRODUCTION',
                            content: [
                                { type: 'text', content: 'The Rojifi PHP library provides convenient access to the Rojifi API from applications written in the PHP language.\n\n### Installation' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'bash',
                                        code: 'composer require rojifi/rojifi-php'
                                    }
                                },
                                { type: 'text', content: '### Usage' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'php',
                                        code: "$rojifi = new \\Rojifi\\RojifiClient('sk_test_...');\n\n$customers = $rojifi->customers->all();"
                                    }
                                }
                            ]
                        },
                        {
                            id: 'go',
                            title: 'Go',
                            description: 'Official Rojifi Go SDK',
                            status: 'PRODUCTION',
                            content: [
                                { type: 'text', content: 'The Rojifi Go library provides convenient access to the Rojifi API from applications written in the Go language.\n\n### Installation' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'bash',
                                        code: 'go get github.com/rojifi/rojifi-go'
                                    }
                                },
                                { type: 'text', content: '### Usage' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'go',
                                        code: "import (\n    \"github.com/rojifi/rojifi-go\"\n    \"github.com/rojifi/rojifi-go/customer\"\n)\n\nfunc main() {\n    rojifi.Key = \"sk_test_...\"\n    params := &rojifi.CustomerListParams{}\n    i := customer.List(params)\n}"
                                    }
                                }
                            ]
                        },
                        {
                            id: 'ruby',
                            title: 'Ruby',
                            description: 'Official Rojifi Ruby SDK',
                            status: 'PRODUCTION',
                            content: [
                                { type: 'text', content: 'The Rojifi Ruby library provides convenient access to the Rojifi API from applications written in the Ruby language.\n\n### Installation' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'bash',
                                        code: 'gem install rojifi'
                                    }
                                },
                                { type: 'text', content: '### Usage' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'ruby',
                                        code: "require 'rojifi'\n\nRojifi.api_key = 'sk_test_...'\n\ncustomers = Rojifi::Customer.list"
                                    }
                                }
                            ]
                        },
                        {
                            id: 'rust',
                            title: 'Rust',
                            description: 'Official Rojifi Rust SDK',
                            status: 'PRODUCTION',
                            content: [
                                { type: 'text', content: 'The Rojifi Rust library provides convenient access to the Rojifi API from applications written in Rust.\n\n### Installation' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'toml',
                                        code: '[dependencies]\nrojifi = "0.1.0"'
                                    }
                                },
                                { type: 'text', content: '### Usage' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'rust',
                                        code: "use rojifi::Client;\n\n#[tokio::main]\nasync func main() {\n    let client = Client::new(\"sk_test_...\");\n    let customers = client.customers().list().await.unwrap();\n}"
                                    }
                                }
                            ]
                        },
                        {
                            id: 'java',
                            title: 'Java',
                            description: 'Official Rojifi Java SDK',
                            status: 'PRODUCTION',
                            content: [
                                { type: 'text', content: 'The Rojifi Java library provides convenient access to the Rojifi API from applications written in Java.\n\n### Installation' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'xml',
                                        code: '<dependency>\n  <groupId>com.rojifi</groupId>\n  <artifactId>rojifi-java</artifactId>\n  <version>1.0.0</version>\n</dependency>'
                                    }
                                },
                                { type: 'text', content: '### Usage' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'java',
                                        code: "import com.rojifi.Rojifi;\nimport com.rojifi.model.Customer;\n\nRojifi.apiKey = \"sk_test_...\";\n\nCustomerCollection customers = Customer.list(params);"
                                    }
                                }
                            ]
                        },
                        {
                            id: 'dotnet',
                            title: '.NET',
                            description: 'Official Rojifi .NET SDK',
                            status: 'PRODUCTION',
                            content: [
                                { type: 'text', content: 'The Rojifi .NET library provides convenient access to the Rojifi API from applications written in C# and other .NET languages.\n\n### Installation' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'bash',
                                        code: 'dotnet add package Rojifi.net'
                                    }
                                },
                                { type: 'text', content: '### Usage' },
                                {
                                    type: 'code',
                                    codeSnippet: {
                                        language: 'csharp',
                                        code: "using Rojifi;\n\nRojifiConfiguration.ApiKey = \"sk_test_...\";\n\nvar service = new CustomerService();\nvar customers = service.List();"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            changelog: [
                {
                    title: '2023',
                    pages: [
                        {
                            id: 'october-2023',
                            title: 'October 2023',
                            description: 'Updates in October',
                            status: 'PRODUCTION',
                            content: [
                                { type: 'text', content: '- Improved dashboard performance\n- Added new webhooks' }
                            ]
                        }
                    ]
                }
            ]
        },
    },
];

