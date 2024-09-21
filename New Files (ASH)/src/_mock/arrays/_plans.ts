// ----------------------------------------------------------------------
export const _tgrStats = {
  title: 'TGR Stats',
  values: [
    {
      title: 'Circulating Supply',
      value: 14886668,
    },
    {
      title: 'Market Cap',
      value: 22117,
    },
    {
      title: 'Total Minted',
      value: '37150419',
    },
    {
      title: 'HTZ burnt by Hertz Tokens',
      value: 12253751,
    },
    {
      title: 'New HTZ/Block',
      value: 0.35,
    },
  ],
};

export const _htzStats = {
  title: 'HTZs Stats',
  values: [
    {
      title: 'Circulating Supply',
      value: 14886668,
    },
    {
      title: 'Market Cap',
      value: 22117,
    },
    {
      title: 'Total Minted',
      value: '37150419',
    },
    {
      title: 'HTZ burnt by Hertz Tokens',
      value: 12253751,
    },
    {
      title: 'New HTZ/Block',
      value: 0.35,
    },
  ],
};

export const _tvlStats = {
  value: 24389.9,
  link: 'https://google.com',
};

export const _pricingPlans = [
  {
    subscription: 'basic',
    price: 0,
    caption: 'forever',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: false },
      { text: 'Advanced security', isAvailable: false },
      { text: 'Permissions & workflows', isAvailable: false },
    ],
    labelAction: 'current plan',
  },
  {
    subscription: 'starter',
    price: 4.99,
    caption: 'saving $24 a year',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: true },
      { text: 'Advanced security', isAvailable: false },
      { text: 'Permissions & workflows', isAvailable: false },
    ],
    labelAction: 'choose starter',
  },
  {
    subscription: 'premium',
    price: 9.99,
    caption: 'saving $124 a year',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: true },
      { text: 'Advanced security', isAvailable: true },
      { text: 'Permissions & workflows', isAvailable: true },
    ],
    labelAction: 'choose premium',
  },
];
