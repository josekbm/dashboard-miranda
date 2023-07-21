export interface Booking {
    guest_name: string;
    booking_id: string;
    booking_date: string;
    check_in: string;
    check_out: string;
    special_requests: string;
    room_type: string;
    status: string;
}

export interface User{
    photo: string;
    name: string;
    id: string;
    email: string;
    phone: string;
    startDate: string;
    jobDescription: string | undefined,
    state: string,
    password: string,
    position: string
    
}

export interface Room{
    roomType: string;
    roomNumber: string;
    id: string;
    description: string;
    price: number;
    discount: number;
    cancellation: string;
    amenities: string[];
    thumbnail: string;
    images: string[];
    status: string;
}



type customer = {
    name: string;
    phone: string;
    email: string;
}

  export interface Contact {
    date: string;
    archived: boolean;
    customer: customer;
    id: string;
    subject: string;
    comment: string;
 }