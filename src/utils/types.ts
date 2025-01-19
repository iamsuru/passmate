import { Static, Type } from "@sinclair/typebox";

const Button = Type.Object({
    buttonName: Type.String(),
    bgColor: Type.String(),
    variant: Type.String()
})

export type TButton = Static<typeof Button>

const IconIdentifierSchema = Type.Object({
    icon: Type.Any(),
    placeHolder: Type.String(),
});

export type TIconIdentifierProps = Static<typeof IconIdentifierSchema>;

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