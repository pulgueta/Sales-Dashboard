import { useState, useEffect } from 'react';

import { ApplicationVerifier, RecaptchaVerifier } from 'firebase/auth';

import { auth } from '../firebase';

export const useCaptcha = (id: string): ApplicationVerifier | undefined => {
    const [captcha, setCaptcha] = useState<ApplicationVerifier>()

    useEffect(() => {
        const captchaVerifier = new RecaptchaVerifier(id, {
            "size": "invisible",
            "callback": () => { }
        }, auth);

        setCaptcha(captchaVerifier)

        return () => {
            captchaVerifier.clear();
        }
    }, [id])

    return captcha;
}