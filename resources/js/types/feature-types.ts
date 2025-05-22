export type Institution = {
    id: string;
    name: string;
    registration_no: string;
    no_of_students: number;
    no_of_teachers: number;
    type: string;
    cover_photo: string;
    logo: string;
    location: string;
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
    };
};

export type Level = {
    id: string;
    name: string;
    status: string;
    institution: {
        id: number;
        name: string;
    };
};

export type Subject = {
    id: string;
    name: string;
    status: string;
    level_id: string;
    institution_id: string;
    level: {
        id: number;
        name: string;
    };
    institution: {
        id: number;
        name: string;
    };
};

export type Teacher = {
    id: string;
    address: string;
    status: string;
    designation: string;
    pds_id: string;
    joining_date: Date;
    location: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    institution: {
        id: number;
        name: string;
    };
};