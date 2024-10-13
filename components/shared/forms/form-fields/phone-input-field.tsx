"use client";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PhoneInputField({ field, placeholder }: { field: any; placeholder?: string }) {
    // `value` will be the parsed phone number in E.164 format.
    // Example: "+12133734253".
    return (
        <PhoneInput
            defaultCountry="CA"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className="input"
        />
    );
}
