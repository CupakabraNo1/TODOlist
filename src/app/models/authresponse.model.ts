export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
