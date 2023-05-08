
const account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;



const user = [
  {
    user_id: 1,
    email: "alex.ottmann@hotmail.fr",
    firstname: "Alexandre",
    lastname: "Ottmann",
    password: "1234",
    city: "Paris",
    zip_code: 75000,
    country: "France",
    occupation: "Sound Designer",
    phone_number: "06 66 66 66 66",
    role: "user",
    photo_url: "https://unsplash.com/fr/photos/j_yjULg-DOE",
    siret: 84351374800015,
    iban: "FR76 2222 2222 2222 2222 2222 333",
    bic: "CMCIFR2A",
    clients: [
      {
        client_id: 22222,
        email: "clement@gmail.com",
        firstname: "Clément",
        lastname: "Rollot",
        adress: "8 rue de la paix",
        zip_code: "75000",
        city: "Paris",
        country: "France",
        phone_number: "06 66 66 66 66",
        role: "non_user",
        siret: 84351374800015,
        photo_url: "https://unsplash.com/fr/photos/j_yjULg-DOE",
        provenance: "Malt",
        commentary: "Clément est un joyeux compagnon de mission, il est robuste et cocasse.",
        missions: [
          {
            mission_id: 444444,
            name: "Oclock",
            start_date: "",
            end_date: "",
            status: "En Cours",
            total_price: 50.5,
            tva: 20,
            commentary: "Production d'un podcast sur la reconversion, 3 personnes en interview, 40minutes.",
            declarate: false,
            mission_details: [
              { description: "Mix de 4 épisodes, multipiste 3 voix de 40 minutes", quantity: 4, price: 150 },
              { description: "Composition d'un jingle", quantity: 1, price: 500 },
            ]
          }, {
            mission_id: 444444,
            name: "Oclock",
            start_date: "",
            end_date: "",
            status: "En Cours",
            total_price: 50.5,
            tva: 20,
            commentary: "Production d'un podcast sur la reconversion, 3 personnes en interview, 40minutes.",
            declarate: false,
            mission_details: [
              { description: "Mix de 4 épisodes, multipiste 3 voix de 40 minutes", quantity: 4, price: 150 },
              { description: "Composition d'un jingle", quantity: 1, price: 500 },
            ]
          },
          {
            mission_id: 444444,
            name: "Oclock",
            start_date: "",
            end_date: "",
            status: "En Cours",
            total_price: 50.5,
            tva: 20,
            commentary: "Production d'un podcast sur la reconversion, 3 personnes en interview, 40minutes.",
            declarate: false,
            mission_details: [
              { description: "Mix de 4 épisodes, multipiste 3 voix de 40 minutes", quantity: 4, price: 150 },
              { description: "Composition d'un jingle", quantity: 1, price: 500 },
            ]
          },
        ],
      },
      {
        client_id: 33333,
        email: "sandra@gmail.com",
        firstname: "Sandra",
        lastname: "Draps",
        adress: "8 rue de la haine",
        zip_code: "75000",
        city: "Paris",
        country: "France",
        phone_number: "06 61 66 66 66",
        role: "non_user",
        siret: 84351374800015,
        photo_url: "https://unsplash.com/fr/photos/j_yjULg-DOE",
        provenance: "Contact Direct via ami",
        commentary: "Sandra est très réactive et très react. N'hésite pas à apporter son soutient comme elle porte sa famille."
      },
      {
        client_id: 33333,
        email: "Laydi@gmail.com",
        firstname: "Laydi",
        lastname: "So",
        adress: "8 rue de la terre du milieu",
        zip_code: "75000",
        city: "Paris",
        country: "France",
        phone_number: "06 60 66 66 66",
        role: "non_user",
        siret: 84351374200015,
        photo_url: "https://unsplash.com/fr/photos/j_yjULg-DOE",
        provenance: "LinkedIn",
        commentary: "Laydi est là et il le fait savoir, il pèse dans le game du back et crée des routes comme ses chocolat.. Pains au choc du matin."
      }
    ]
  }
]


