import {classes} from '@eviljs/react/classes'
import type {ElementProps, Props} from '@eviljs/react/props'
import type {CheckboxModel} from './checkbox.js'

export function CheckboxMark(props: Props<CheckboxMarkProps>): JSX.Element {
    const {checked, className, checkedIcon, mixedIcon, ...otherProps} = props

    return (
        <span
            {...otherProps}
            className={classes('CheckboxMark-3ae4 std-flex std-flex-justify-center std-flex-align-center', className)}
        >
            {
                checked === 'mixed'
                    ? (mixedIcon ?? '—')
                    : (checkedIcon ?? '✔︎')
            }
        </span>
    )
}

// Types ///////////////////////////////////////////////////////////////////////

export interface CheckboxMarkProps extends ElementProps<'span'>, CheckboxModel {
    checkedIcon?: undefined | React.ReactNode
    mixedIcon?: undefined | React.ReactNode
}
