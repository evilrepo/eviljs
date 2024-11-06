import {classes} from '@eviljs/react/classes'
import type {ElementProps, Props} from '@eviljs/react/props'

export function Tooltip(props: Props<TooltipProps>): undefined | JSX.Element {
    const {children, className, content, contentClass, position, ...otherProps} = props

    if (! children) {
        return
    }

    return (
        <div
            {...otherProps}
            className={classes('Tooltip-ccf9', className, position.split('-'))}
        >
            {children}

            <div className="root-21d5">
                <div className="tooltip-ac0e" role="tooltip">
                    <div className={classes('content-b6b3', contentClass)}>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Types ///////////////////////////////////////////////////////////////////////

export interface TooltipProps extends Omit<ElementProps<'div'>, 'content'>, TooltipModel {
}

export interface TooltipModel {
    content: React.ReactNode
    contentClass?: undefined | string
    position: TooltipPosition
}

export type TooltipPosition = `${'top' | 'left' | 'right' | 'bottom'}-${'start' | 'center' | 'end'}`
