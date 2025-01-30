import { Static, Type } from "@sinclair/typebox";

const Button = Type.Object({
    buttonName: Type.String(),
    bgColor: Type.String(),
    variant: Type.String(),
    isLoading: Type.Optional(Type.Boolean()),
    onClick: Type.Optional(Type.Function([Type.Object({})], Type.Void()))
})

export type TButton = Static<typeof Button>

const IconIdentifierSchema = Type.Object({
    id: Type.String(),
    icon: Type.Any(),
    placeHolder: Type.String(),
    isError: Type.Boolean(),
    onChange: Type.Function([Type.Object({ target: Type.Object({ value: Type.String() }) })], Type.Void())
});

export type TIconIdentifierProps = Static<typeof IconIdentifierSchema>;

const PasswordField = Type.Object({
    id: Type.String(),
    isError: Type.Boolean(),
    onChange: Type.Optional(Type.Function([Type.Object({ target: Type.Object({ value: Type.String() }) })], Type.Void()))
});

export type TPasswordField = Static<typeof PasswordField>;

const CredentialsCard = Type.Object({
    title: Type.String(),
    username: Type.String(),
    password: Type.String(),
})

export type TCredentialsCard = Static<typeof CredentialsCard>;


const CustomModalProps = Type.Object({
    isOpen: Type.Boolean(),
    onClose: Type.Function([], Type.Void()),
    title: Type.String(),
    username: Type.String(),
    password: Type.String(),
    modalType: Type.String(),
})

export type TCustomModalProps = Static<typeof CustomModalProps>

const UserDetails = Type.Object({
    uid: Type.Optional(Type.String()),
    email: Type.String(),
    username: Type.Optional(Type.String()),
    password: Type.String(),
})

export type TUserDetails = Static<typeof UserDetails>

const updateUserDetailsResponse = Type.Object({
    code: Type.Number(),
    message: Type.Optional(Type.String())
})

export type TUpdateUserDetailsResponse = Static<typeof updateUserDetailsResponse>

const createdUser = Type.Object({
    code: Type.Number(),
    type: Type.Optional(Type.String()),
    message: Type.String()
})

export type TCreatedUser = Static<typeof createdUser>


const usernameTaken = Type.Object({
    isUsernameTaken: Type.Optional(Type.Boolean()),
    code: Type.Number(),
    message: Type.Optional(Type.String())
})
export type TUsernameTaken = Static<typeof usernameTaken>

const getUser = Type.Object({
    code: Type.Number(),
    message: Type.Optional(Type.String()),
    password: Type.Optional(Type.String())
})

export type TGetUser = Static<typeof getUser>

const authenticateUser = Type.Object({
    code: Type.Number(),
    type: Type.Optional(Type.String()),
    message: Type.String(),
    data: Type.Optional(Type.Object({}))
})

export type TAuthenticateUser = Static<typeof authenticateUser>

const validations = Type.Object({
    status: Type.Boolean(),
    type: Type.Optional(Type.String()),
    message: Type.Optional(Type.String())
})

export type TValidations = Static<typeof validations>