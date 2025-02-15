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
    icon: Type.Optional(Type.Any()),
    placeHolder: Type.String(),
    isError: Type.Boolean(),
    onChange: Type.Function([Type.Object({ target: Type.Object({ value: Type.String() }) })], Type.Void())
});

export type TIconIdentifierProps = Static<typeof IconIdentifierSchema>;

const PasswordField = Type.Object({
    id: Type.String(),
    isError: Type.Boolean(),
    onChange: Type.Optional(Type.Function([Type.Object({ target: Type.Object({ value: Type.String() }) })], Type.Void())),
    fieldText: Type.Optional(Type.String())
});

export type TPasswordField = Static<typeof PasswordField>;

const CredentialsCard = Type.Object({
    platformName: Type.String(),
    accountUsername: Type.String(),
    accountPassword: Type.String(),
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

const StoreModalProps = Type.Object({
    isOpen: Type.Boolean(),
    onClose: Type.Function([], Type.Void()),
})

export type TStoreModalProps = Static<typeof StoreModalProps>

const UserDetails = Type.Object({
    uid: Type.Optional(Type.String()),
    email: Type.String(),
    username: Type.Optional(Type.String()),
    password: Type.String(),
})

export type TUserDetails = Static<typeof UserDetails>

const createdUser = Type.Object({
    code: Type.Number(),
    type: Type.Optional(Type.String()),
    message: Type.String()
})

export type TCreatedUser = Static<typeof createdUser>

const authenticateUser = Type.Object({
    code: Type.Number(),
    type: Type.Optional(Type.String()),
    message: Type.String(),
    data: Type.Optional(Type.Any())
})

export type TAuthenticateUser = Static<typeof authenticateUser>

const validations = Type.Object({
    status: Type.Boolean(),
    type: Type.Optional(Type.String()),
    message: Type.Optional(Type.String())
})

export type TValidations = Static<typeof validations>

const signOut = Type.Object({
    code: Type.Number(),
    message: Type.Optional(Type.String())
})

export type TSignout = Static<typeof signOut>

const PasswordCredentials = Type.Object({
    uid: Type.String(),
    platformName: Type.String(),
    accountUsername: Type.String(),
    accountPassword: Type.String(),
})

export type TPasswordCredentials = Static<typeof PasswordCredentials>

// Password Service
const StorePasswordResponse = Type.Object({
    code: Type.Number(),
    type: Type.Optional(Type.String()),
    message: Type.String()
})
export type TStorePasswordResponse = Static<typeof StorePasswordResponse>

const CredentialSchema = Type.Object({
    accountPassword: Type.String(),
    accountUsername: Type.String(),
    createdAt: Type.String(),
    platformName: Type.String(),
    updatedAt: Type.String(),
});
export type TCredentialSchema = Static<typeof CredentialSchema>

const FetchPassword = Type.Object({
    code: Type.Number(),
    data: Type.Optional(Type.Record(Type.String(), CredentialSchema)),
    message: Type.Optional(Type.String())
});
export type TFetchPasswordResponse = Static<typeof FetchPassword>;

// Database service
const UpdateUserDataResponse = Type.Object({
    code: Type.Number(),
    message: Type.Optional(Type.String())
})
export type TUpdateUserDataResponse = Static<typeof UpdateUserDataResponse>

const usernameTaken = Type.Object({
    isUsernameTaken: Type.Optional(Type.Boolean()),
    code: Type.Number(),
    message: Type.Optional(Type.String())
})
export type TUsernameTaken = Static<typeof usernameTaken>

const getUser = Type.Object({
    code: Type.Number(),
    message: Type.Optional(Type.String()),
    data: Type.Optional(UserDetails)
})
export type TGetUser = Static<typeof getUser>

const SavePlatformCredentials = Type.Object({
    code: Type.Number(),
    message: Type.Optional(Type.String()),
})
export type TSavePlatformCredentials = Static<typeof SavePlatformCredentials>

const FetchPlatformCredentials = Type.Object({
    platformName: Type.String(),
    accountUsername: Type.String(),
    accountPassword: Type.String(),
})
const FetchPlatformCredentialsResponse = Type.Object({
    code: Type.String(),
    data: Type.Array(Type.Optional(FetchPlatformCredentials))
})
export type TFetchPlatformCredentialsResponse = Static<typeof FetchPlatformCredentialsResponse>