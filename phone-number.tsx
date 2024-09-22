'use client';

import { SelectCountryCodes } from "./country-codes";
import { useField } from "formik";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
    name: string;
}

/**
 * Copy this to your components dir and refactor imports (they might match your project's structure)
 * @param props 
 * @returns 
 */
const InputPhoneNumber = (props: Props) => {

    const formikField = useField(props.name);
    const [countryCode, setCountryCode] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const onChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const name = e.target.name;
        if (name === 'code') {
            setCountryCode(e.target.value);
        } else if (name === 'phone') {
            setPhone(e.target.value);
        }
    }

    useEffect(() => {
        const helper = formikField[2];
        helper.setTouched(true);
        if (!countryCode || !phone) {
            helper.setError('required');
            helper.setValue(null)
            return;
        }
        const fullValue = `${countryCode} ${phone}`;
        helper.setValue(fullValue.trim())
    }, [countryCode, phone])

    return (
        <div className="flex gap-1">
            <select className="w-[50px]" onChange={onChange} name='code'>
                <option value=''>-</option>
                {SelectCountryCodes()}
            </select>
            <input className="w-full" onChange={onChange} name='phone' />
        </div>
    )
}

export default InputPhoneNumber
