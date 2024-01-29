import './home-view.css'

import {classes} from '@eviljs/react/classes'
import {Message} from '@eviljs/react/message'
import {Header} from '~/ui-widgets/header'

export function HomeView(props: HomeViewProps) {
    const {className, ...otherProps} = props

    return (
        <div
            {...otherProps}
            className={classes('HomeView-0d51', className)}
        >
            <Header/>

            <Message tag="h1" className="page-title">
                Home
            </Message>
        </div>
    )
}

// Types ///////////////////////////////////////////////////////////////////////

export interface HomeViewProps extends React.HTMLAttributes<HTMLDivElement> {
}
