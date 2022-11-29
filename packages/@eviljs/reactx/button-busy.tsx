import {classes} from '@eviljs/web/classes.js'
import {cloneElement} from 'react'
import type {ButtonProps} from './button.js'
import {Button} from './button.js'

export function BusyButton(props: BusyButtonProps) {
    const {className, busy, children, spinner, ...otherProps} = props
    const active = busy

    return (
        <Button
            {...otherProps}
            className={classes('BusyButton-f1d2', className, {busy})}
        >
            <span className="content-6f92">
                {children}
            </span>

            <span className="spinner-932c">
                {cloneElement(spinner, {
                    ...spinner.props,
                    className: classes(spinner.props.className, {active}),
                    active,
                })}
            </span>
        </Button>
    )
}

// Types ///////////////////////////////////////////////////////////////////////

export interface BusyButtonProps extends ButtonProps {
    busy?: boolean
    spinner: React.ReactElement
}
