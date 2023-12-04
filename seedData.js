// Insertion des utilisateurs
db.users.insertMany([
    {
      email: "user1@example.com",
      pseudo: "user1",
      password: "motdepasse1",
      role: "normal",
    },
    {
      email: "user2@example.com",
      pseudo: "user2",
      password: "motdepasse2",
      role: "normal",
    },
    {
      email: "employee@example.com",
      pseudo: "employee",
      password: "employeepassword",
      role: "employee",
    },
  ]);
  
  // Insertion des gares
  db.stations.insertMany([
    {
      name: "Gare A",
      openingTime: "08:00",
      closingTime: "20:00",
      image: "lien_image_gare_a",
    },
    {
      name: "Gare B",
      openingTime: "09:00",
      closingTime: "18:00",
      image: "lien_image_gare_b",
    },
    // Ajoutez d'autres gares selon vos besoins
  ]);
  
  // Insertion des trains
  db.trains.insertMany([
    {
      name: "Train 1",
      departureStation: "Gare A",
      arrivalStation: "Gare B",
      departureTime: "10:00",
    },
    {
      name: "Train 2",
      departureStation: "Gare B",
      arrivalStation: "Gare A",
      departureTime: "12:00",
    },
    // Ajoutez d'autres trains selon vos besoins
  ]);
  
  // Insertion des réservations
  db.reservations.insertMany([
    {
      userId: ObjectId("id_utilisateur_1"),
      trainId: ObjectId("id_train_1"),
      seatNumber: "A1",
      isValidated: true,
    },
    {
      userId: ObjectId("id_utilisateur_2"),
      trainId: ObjectId("id_train_2"),
      seatNumber: "B2",
      isValidated: false,
    },
    // Ajoutez d'autres réservations selon vos besoins
  ]);
  