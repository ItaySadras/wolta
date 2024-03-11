import React from "react";
import Review from "./Review";

const reviews = [
  {
    id: "65e81be98630ba788c71bbd0",
    customerId: {
      id: "65e81be98630ba788c71bbce",
      name: "Amari77",
      email: "Rosemarie83@gmail.com",
      password: "4NNCGQJfn1tQYGj",
      phoneNumber: ["216.295.3680"],
      addresses: [],
      v: 0,
    },
    restaurantId: "65e81bb48630ba788c71bb97",
    grade: 5,
    comment:
      "Thesaurus volutabrum condico urbanus. Ascisco umquam statua thesis commodi civitas esse. Sequi aduro agnitio.",
    whenSubmitted: "2024-02-11T11:08:12.916Z",
    v: 0,
  },
  {
    id: "65e81bea8630ba788c71bbd4",
    customerId: {
      id: "65e81be98630ba788c71bbd2",
      name: "Wilhelmine_Boyer50",
      email: "Philip90@hotmail.com",
      password: "YDr_6P7vwTAIhRe",
      phoneNumber: ["(445) 993-6930 x0958"],
      addresses: [],
      v: 0,
    },
    restaurantId: "65e81bb48630ba788c71bb97",
    grade: 4,
    comment:
      "Curriculum tum uredo deputo sit vir sponte. Basium theologus tamdiu coniuratio spoliatio ex conitor adstringo corporis barba. Vivo laborum uberrime numquam.",
    whenSubmitted: "2024-03-06T03:22:25.593Z",
    v: 0,
  },
  {
    id: "65e81bea8630ba788c71bbd8",
    customerId: {
      id: "65e81bea8630ba788c71bbd6",
      name: "Eldora.Gutmann-Schmidt0",
      email: "Lewis_Hahn@gmail.com",
      password: "VIiRVAgeNcgx7D_",
      phoneNumber: ["1-433-769-6711 x558"],
      addresses: [],
      v: 0,
    },
    restaurantId: "65e81bb48630ba788c71bb97",
    grade: 4,
    comment:
      "Eius bestia usque animadverto nemo audeo stipes. Tunc volaticus rerum adnuo trado temperantia ager aeternus. Itaque terga tot sursum delego acerbitas sub calco.",
    whenSubmitted: "2024-02-27T07:22:56.857Z",
    v: 0,
  },
  {
    id: "65e81bea8630ba788c71bbdc",
    customerId: {
      id: "65e81bea8630ba788c71bbda",
      name: "Reymundo.Pacocha",
      email: "Dina_Haley@hotmail.com",
      password: "FmtbSjmZeJeOYH6",
      phoneNumber: ["989.846.6273 x1209"],
      addresses: [],
      v: 0,
    },
    restaurantId: "65e81bb48630ba788c71bb97",
    grade: 5,
    comment:
      "Decretum mollitia audentia. Depereo veritas ulterius communis ipsam deputo infit bellicus sursum. Arca conventus vulgo ipsam.",
    whenSubmitted: "2024-03-05T05:09:04.721Z",
    v: 0,
  },
];

function getReviewDetails() {
  return (
    <>
      <div>
        {reviews.map((review, index) => (
          <Review currentReview={review} />
        ))}
      </div>
    </>
  );
}
const reviewDetails = getReviewDetails(reviews);

export default getReviewDetails;
