import type { AuthField } from "types";

export const SignInFields: AuthField[] = [
    {
        label: "Email address",
        type: "email",
        id: "email",
        placeholder: "name@company.com",
        required: true
    },
    {
        label: "Password",
        type: "password",
        id: "password",
        placeholder: "••••••••",
        required: true
    }
];

export const SignUpFields = [
    {
        label: "Full Name",
        type: "text",
        id: "name",
        placeholder: "John Doe",
        required: true
    },
    {
        label: "Email Address",
        type: "email",
        id: "email",
        placeholder: "name@company.com",
        required: true
    },
    {
        label: "Password",
        type: "password",
        id: "password",
        placeholder: "••••••••",
        required: true
    }
];
