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
    id: Type.Optional(Type.String()),
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
    id: Type.Optional(Type.String()),
    isOpen: Type.Boolean(),
    onClose: Type.Function([], Type.Void()),
    flag: Type.Optional(Type.Union([Type.String(), Type.Boolean()])),
})
export type TStoreModalProps = Static<typeof StoreModalProps>

const UserDetails = Type.Object({
    uid: Type.Optional(Type.String()),
    email: Type.String(),
    username: Type.Optional(Type.String()),
    password: Type.String(),
})
export type TUserDetails = Static<typeof UserDetails>

const CreatedUser = Type.Object({
    code: Type.Number(),
    type: Type.Optional(Type.String()),
    message: Type.String()
})
export type TCreatedUser = Static<typeof CreatedUser>

const AuthenticateUser = Type.Object({
    code: Type.Number(),
    type: Type.Optional(Type.String()),
    message: Type.String(),
    data: Type.Optional(Type.Any())
})
export type TAuthenticateUser = Static<typeof AuthenticateUser>

const Validations = Type.Object({
    status: Type.Boolean(),
    type: Type.Optional(Type.String()),
    message: Type.Optional(Type.String())
})
export type TValidations = Static<typeof Validations>

const SignOut = Type.Object({
    code: Type.Number(),
    message: Type.Optional(Type.String())
})
export type TSignout = Static<typeof SignOut>

const VaultEntry = Type.Object({
    uid: Type.String(),
    platformName: Type.String(),
    accountUsername: Type.String(),
    accountPassword: Type.String(),
})
export type TVaultEntry = Static<typeof VaultEntry>

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

const UsernameTaken = Type.Object({
    isUsernameTaken: Type.Boolean(),
    code: Type.Number(),
})
export type TUsernameTaken = Static<typeof UsernameTaken>

const GetUser = Type.Object({
    code: Type.Number(),
    message: Type.Optional(Type.String()),
    data: Type.Optional(UserDetails)
})
export type TGetUser = Static<typeof GetUser>

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

const UpdateVaultEntry = Type.Object({
    id: Type.String(),
    uid: Type.String(),
    accountUsername: Type.Optional(Type.String()),
    accountPassword: Type.Optional(Type.String()),
})
export type TUpdateVaultEntry = Static<typeof UpdateVaultEntry>

const UpdateVaultResponse = Type.Object({
    code: Type.Number(),
    message: Type.Optional(Type.String()),
})
export type TUpdateVaultResponse = Static<typeof UpdateVaultResponse>

const DeleteVaultCredentials = Type.Object({
    id: Type.String(),
    uid: Type.String(),
})
export type TDeleteVaultCredentials = Static<typeof DeleteVaultCredentials>

const Response = Type.Object({
    code: Type.Number(),
    type: Type.Optional(Type.String()),
    message: Type.Optional(Type.String()),
})
export type TResponse = Static<typeof Response>