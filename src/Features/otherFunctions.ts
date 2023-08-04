import { Booking } from "../interfaces";
import rooms from "../Data/roomsData.json"

type data = Booking | Booking[] 
export function delay(data: data, time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}

export const offerChecker = (discount: number) => {
  if (discount > 0) {
    return "OFFER";
  } else return "";
};

export const offerPriceCalc = (price: number, discount: number) => {
  return discount > 0 ? price - (price * discount) / 100 + "$" : "-";
};

export const dateConverter = (dateToConver : string) => {
  const fecha = new Date(dateToConver);

  const opcionesFecha: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  const opcionesHora: Intl.DateTimeFormatOptions = { hour12: true, hour: "numeric", minute: "numeric" };

  const fechaString = fecha.toLocaleDateString("en-US", opcionesFecha);
  const horaString = fecha.toLocaleTimeString("en-US", opcionesHora);

  return {
    date: fechaString,
    hour: horaString,
  };
};

export const bookedStatusCalc = (checkIn: string, checkOut: string) => {
  const actualDate = new Date();
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (actualDate.getTime() < checkInDate.getTime()) {
    return "CHECK IN";
  } else if (actualDate.getTime() > checkOutDate.getTime()) {
    return "CHECK OUT";
  } else {
    return "IN PROGRESS";
  }
};

export const totalPriceCalc = (pricePerNight: number, checkIn: string, checkOut: string) => {
  var date1 = new Date(checkOut);
  var date2 = new Date(checkIn);

  var difference = date1.getTime() - date2.getTime();
  return Math.round(difference / (1000 * 60 * 60 * 24)) * pricePerNight;
};

export function getTodayString() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  let day = dd.toString()
  let month = mm.toString()
  let year = yyyy.toString()

  if (dd < 10) {
    day = "0" + day;
  }

  if (mm < 10) {
    
    month = "0" + month;
  }

  return year + "-" + month + "-" + day;
}

export const jobDescriptionChooser = (position: string) => {
  if (position === "Manager") {
    return "Responsible for the hotel's daily management.";
  } else if (position === "Recepcionist") {
    return "Responsible for greeting guests and checking them in and out of the hotel.";
  } else if (position === "Room Service") {
    return "Responsible for preparing and delivering food and beverages to guest rooms.";
  }
};

export const roomInfoChooser = (roomType: string) => {
  switch (roomType) {
    case "Single Bed":
      return {
        cancellation:
          "You can cancel up to 24 hours before check-in without penalty.",
        amenities: ["Wi-Fi", "TV", "Air conditioning"],
        thumbnail:
          "https://images.unsplash.com/photo-https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1218&q=80-b512e3989a33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80",
        images: [
          "https://images.unsplash.com/photo-https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1218&q=80-b512e3989a33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80",
          "https://images.unsplash.com/photo-1604709177225-055f99402ea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          "https://images.unsplash.com/photo-1486946255434-2466348c2166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        ],
      };
    case "Double Bed":
      return {
        cancellation:
          "You can cancel up to 48 hours before check-in without penalty.",
        amenities: ["Wi-Fi", "TV", "A/C", "Air conditioning", "Safe"],
        thumbnail:
          "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1157&q=80",
        images: [
          "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1157&q=80",
          "https://plus.unsplash.com/premium_photo-1676320514021-7c68dda90026?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        ],
      };
    case "Double Superior":
      return {
        cancellation:
          "You can cancel up to 72 hours before check-in without penalty.",
        amenities: ["Wi-Fi", "TV", "Safe", "Bathtub", "Air conditioning"],
        thumbnail:
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        images: [
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
          "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
        ],
      };
    case "Suite":
      return {
        cancellation:
          "You can cancel up to 1 week before check-in without penalty.",
        amenities: [
          "Wi-Fi",
          "TV",
          "Kitchen",
          "Hair dryer",
          "Air conditioning",
          "Bathtub",
          "Safe",
        ],
        thumbnail:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          "https://images.unsplash.com/photo-1609946860441-a51ffcf22208?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1056&q=80",
          "https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        ],
      };

    default:
      return {
        cancellation: "",
        amenities: [""],
        thumbnail: "",
        images: [""],
      };
  }
};

export const maxCharString = (string :string, maxChar: number) =>{
  return string.slice(0, maxChar) +"..."
}

export const searchBookingRoom = (roomId: string) => {
  const room = rooms.find(
    (object) => object.id === roomId
  );
  if(room){
    return room
  } else return {
    roomType: "",
    roomNumber: "",
    id: "",
    description: "",
    price: 0,
    discount: 0,
    cancellation: "",
    amenities: [""],
    thumbnail: "",
    images: [""],
    status: "",
  }
};