export type Location = {
    city: string;
    country: string;
    address: string;
    postalCode: string;
    streetNumber: string;
}
export type UserRegistrationRequest = {
    email: string;
    username: string;
    id: string;
    location: Location;
}
export type GetUserRegistrationRequestsResponse ={
    pendings:UserRegistrationRequest[];
    rejected:UserRegistrationRequest[];
    approved:UserRegistrationRequest[];
}