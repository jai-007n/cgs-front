import toast from "react-hot-toast";
import jQuery from 'jquery'

export function authToken() {
    return localStorage.getItem('currentToken') ? JSON.parse(localStorage.getItem('currentToken')) : null
}

export function commonCatchBlock(err, frm = false, loginAction = false) {
    if (!err.response) {
        return toast.error('Something went wrong', {
            duration: 2000,
            position: 'top-right',
        })
    }
    if (!loginAction) {
        if (err.response.status === 401) {
            destroyTokenDetails()
            window.location.href = "/"
            return false
        }
    }

    if (err.response.status === 409) {
        return toast.error('Something went wrong', {
            duration: 2000,
            position: 'top-right',
        })
    }

    if (err.response.status === 400) {
        return toast.error(err.response.data.message, {
            duration: 2000,
            position: 'top-right',
        });
    }

    if (err.response.status === 406) {
        return toast.error(err.response.data.message, {
            duration: 2000,
            position: 'top-right',
        });
    }

    if (frm) {
        let errors = err.response.data;
        frm.find('.form-group').removeClass('error');
        frm.find('.help-block').html('');
        let checkFirstEle = 0;
        jQuery.each(errors, function (i, _msg) {
            let el = frm.find("[name=" + i + "]");
            if (checkFirstEle === 0) {
                el.focus();
                checkFirstEle++;
            }
            el.parents('.form-group').find('.help-block').addClass('text-red-500')
            el.parents('.form-group').find('.help-block').html(_msg);
        });
        return toast.error(err.response.data.message, {
            duration: 2000,
            position: 'top-right',
        })
    } else {
        if (err.response?.data?.message)
            toast.error(err.response.data.message, {
                duration: 2000,
                position: 'top-right',
            })
    }
    if (err.response.status === 500) {
        return toast.error(err.response.data.message, {
            duration: 2000,
            position: 'top-right',
        });
    }
}

export const commonValidatorChecked = (data, validatorValid, formName = 'forgotPasswordForm') => {
    let frm = document.getElementById(formName)
    frm = jQuery(frm);
    let validatorResult = validatorValid.validate(data)
    console.log("va;idator result", validatorResult)
    delete validatorResult['isValid'];
    return commonFrontCatchBlock(validatorResult, frm)
}

export const commonValidatorCheckedOnes = (data, validatorValid, formName = 'forgotPasswordForm', propName) => {
    let frm = document.getElementById(formName)
    frm = jQuery(frm);
    let validatorResult = validatorValid.validateOne(data, propName)
    let errResult = {}
    errResult[propName] = validatorResult[propName]
    return commonFrontCatchBlock(errResult, frm)
}

export function commonFrontCatchBlock(err, frm) {
    let isError = false;
    if (frm) {
        frm.find('.form-group').removeClass('error');
        frm.find('.help-block').html('');
        let checkFirstEle = 0;
        for (const val in err) {
            let el = frm.find("[name=" + val + "]");
            if (checkFirstEle === 0) {
                el.focus();
                checkFirstEle++;
            }
            if (!err[val]?.isInvalid) {
                el.parents('.form-group').find('.help-block').html('');
                continue;
            }
            isError = true
            el.parents('.form-group').find('.help-block').addClass('text-red-500')
            el.parents('.form-group').find('.help-block').html(err[val]?.message);
        }
    }
    return isError
}

export function authHeader(url) {

    let currentToken = localStorage.getItem('currentToken') ? JSON.parse(localStorage.getItem('currentToken')) : null
    
    if (currentToken) {
        return {
            "x-auth-token": currentToken,
            "Authorization":currentToken
            // "x-time-zone": getBrowserTimezone(),
            // "x-hmac-token": generateHash((url))
        }
    } else {
        return {
            // "x-time-zone": getBrowserTimezone(),
            // "x-hmac-token": generateHash((url))
        }
    }

}

export const debounce = (func) => {
    let timer;
    return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            func.apply(context, args);
        }, 1000)
    }
}

export function destroyTokenDetails() {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentToken')
    localStorage.removeItem('refreshToken')
}

export const getTodayDate = () => {
    return new Date().getDate();

};

export const getTodayMonth = () => {
    let month = new Date().getMonth();
    if (month === (10 || 11 || 12))
        return (month + 1)
    else
        return ('0' + (month + 1))

};

export const getTodayYear = () => {
    return new Date().getFullYear();

};

export function roleCan(roles, privilege_id, column) {
    let isValid = false
    if (roles?.length > 0)
        for (let i = 0; i < roles?.length; i++) {
            if (roles[i]?.privilege_id === privilege_id) {
                if (roles[i]?.[column] === true) {
                    isValid = true
                    break;
                }
            }
        }

    return isValid
}