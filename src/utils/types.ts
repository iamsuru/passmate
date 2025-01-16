import { Static, Type } from "@sinclair/typebox";

const Button = Type.Object({
    buttonName: Type.String(),
    bgColor: Type.String()
})

export type TButton = Static<typeof Button>

const IconIdentifierSchema = Type.Object({
    icon: Type.Any(),
    placeHolder: Type.String(),
});
export type TIconIdentifierProps = Static<typeof IconIdentifierSchema>;
