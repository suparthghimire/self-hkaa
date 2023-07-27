import { Button as MantineButton, ButtonProps } from "@mantine/core";
import React from "react";

const Button: React.FC<ButtonProps> = (props) => {

    const buttonStyle = {
        borderRadius: "100px",
        padding: "12px 24px",
        fontSize: "20px",
        fontWeight: 500,
        height: "auto",
        textTransform: "uppercase",
    };
    return <MantineButton style={buttonStyle} {...props} />
};

export default Button
