import {useAuth} from '@eviljs/react/auth'
import {classes} from '@eviljs/react/react'
import {Button} from '@eviljs/reactx/button'
import {useCallback} from 'react'
import {useI18nMsg} from 'lib/hooks/i18n'
import {Header} from 'lib/widgets/header'

import './admin-view.css'

export function AdminView(props: AdminViewProps) {
    const {className, ...otherProps} = props
    const {destroySession} = useAuth()


    const msg = useI18nMsg(({ t }) => {
        return {
            title: t`Admin`,
        }
    })

    const onExitButtonClick = useCallback(() => {
        destroySession()
    }, [])

    return (
        <div
            {...otherProps}
            className={classes('AdminView-a22c std std-theme-light', className)}
        >
            <Header/>

            <h1 className="page-title">
                {msg.title}
            </h1>

            <Button
                className="halo"
                onClick={onExitButtonClick}
            >
                Exit
            </Button>
        </div>
    )
}

// Types ///////////////////////////////////////////////////////////////////////

export interface AdminViewProps extends React.HTMLAttributes<HTMLDivElement> {
}
