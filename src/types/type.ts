export type User = {
    name?: string | null;
    id?: string | null;
    email?: string | null;
    image?: string | null;
}

export type Reservation = {
    id?: string | null;
    userId?: string | null;
    date?: Date | null;
    createdAt?: Date | null; 
}