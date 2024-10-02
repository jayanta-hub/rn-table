export interface RnOtpInputsProps {
    pinCount: number;
    onSubmit: (otp: number) => void;
    secureTextEntry?: boolean;
    autoSubmit?: boolean;
    mode?: "rectangle" | "flat"| "circle";
    borderRadius?: number;
    onChageValue?: (otp: number) => void;
    bgColor?: string;
    textColor?: string;
    borderWidth?: number;
    borderColor?: string;
    keyboardType?: "number-pad";
    buttonTitle?: string;
    Minute?: number;
    Second?: number;
    buttonStyle?: object;
    onlyResendOtp?: boolean;
    onResendClick?: () => void;
    buttonTitleStyle?: object;
    resendTextStyle?: object;
    isError?: boolean;
    inputHeightAndWidth?:number;
    errorMsgStyle?: object;
    errorMsg?: string;
    isButtonDisplay?: boolean;
    isResendOtpDisplay?: boolean;
}