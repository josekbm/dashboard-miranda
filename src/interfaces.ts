export interface Booking {
    guest_name: string;
    booking_id: string;
    booking_date: string;
    check_in: string;
    check_out: string;
    special_request: string;
    room_type: string;
    status: string;
}

export interface User{
    pic: string;
    full_name: string;
    employee_id: string;
    email: string;    
    start_date: string;
    position: string;
    contact: string;
    status: string;
    
}

export interface Room{
    photo: string;
    number: number;
    id: string;
    type: string;
    price: number;
    status: boolean;
    amenities: string | undefined;
}



export interface Contact {
    message_date: string;
    message_hour: string;
    massage_id: number;
    customer: string;
    customer_mail: string;
    customer_phone: string;
    topic: string;
    message_content: string;

}