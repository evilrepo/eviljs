import {useAuth, AuthTokenState} from '@eviljs/react/auth'
import {classes} from '@eviljs/react/classes'
import {useRouter, Redirect} from '@eviljs/react/router'
import {AuthCredentials} from '@eviljs/reactx/auth-credentials'
import {useCallback} from 'react'
import {useI18nMsg} from 'lib/hooks/i18n'

import './auth-view.css'

export function AuthView(props: AuthViewProps) {
    const {className, ...otherProps} = props
    const {tokenState} = useAuth()
    const {routeParams} = useRouter()
    const redirectPath = routeParams.redirect ?? '/'

    const msg = useI18nMsg(({ t }) => ({
        error: t`Wrong Email or Password`,
        identifier: t`Email`,
        secret: t`Password`,
        signin: t`Enter`,
    }))

    const formatError = useCallback((error: unknown) => {
        return msg.error
    }, [msg.error])

    if (tokenState === AuthTokenState.Valid) {
        return <Redirect to={redirectPath}/>
    }

    return (
        <div
            {...otherProps}
            className={classes('AuthView-b622 std theme-light std-extend-v std-flex column stack', className)}
        >
            <AuthCredentials
                className="credentials-b2be"
                messages={msg}
                formatError={formatError}
            />
        </div>
    )
}

// Types ///////////////////////////////////////////////////////////////////////

export interface AuthViewProps extends React.HTMLAttributes<HTMLDivElement> {
}
