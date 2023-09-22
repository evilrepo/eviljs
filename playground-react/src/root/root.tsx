import '@eviljs/reactx/showcase/theme-v1.css'

import {AuthProvider} from '@eviljs/react/auth'
import {ContainerProvider} from '@eviljs/react/container'
import {StoreProvider as StoreProviderV4} from '@eviljs/react/experimental/store-v4'
import {I18nProvider} from '@eviljs/react/i18n'
import {LoggerProvider} from '@eviljs/react/logger'
import {Portal, PortalProvider} from '@eviljs/react/portal'
import {PortalsProvider} from '@eviljs/react/portals'
import {RequestProvider} from '@eviljs/react/request'
import {Arg, CaseRoute, RouterProvider, SwitchRoute, exact} from '@eviljs/react/router'
import {Showcase} from '@eviljs/reactx/showcase'
import {pipe} from '@eviljs/std/pipe'
import {NotFoundView} from '~/app-404/404-view'
import {AdminView} from '~/app-admin/admin-view'
import {AuthView} from '~/app-auth/auth-view'
import {HomeView} from '~/app-home/home-view'
import ShowcaseIndex from '~/app-showcase'
import type {Container} from '~/container/container-apis'
import {I18nSpec} from '~/i18n/i18n-apis'
import * as Routes from '~/route/route-apis'
import {createRouter} from '~/router/router-apis'
import {StoreSpec as StoreSpecV4} from '~/store-v4-experimental/store-v4-experimental-apis'
import {useStoreStorage} from '~/store/store-hooks'
import {StoreSpec as StoreSpecV3} from '~/store/store-v3-apis'
import {StoreProvider as StoreProviderV3} from '~/store/store-v3-hooks'
import {useColorSchemePreference} from '~/theme/theme-hooks'
import {AuthBarrier} from '~/ui-widgets/auth-barrier'
import {Header} from '~/ui-widgets/header'

export function Root(props: RootProps) {
    const {children, container} = props
    const {Cookie, Fetch, Logger, Query} = container

    return pipe(children)
        .to(it => AuthProvider({children: it, fetch: Fetch, cookie: Cookie}))
        .to(it => ContainerProvider({children: it, value: container}))
        .to(it => I18nProvider({children: it, ...I18nSpec}))
        .to(it => LoggerProvider({children: it, value: Logger}))
        .to(it => PortalProvider({children: it}))
        .to(it => PortalsProvider({children: it}))
        .to(it => RequestProvider({children: it, value: Query}))
        .to(it => RouterProvider({children: it, createRouter}))
        .to(it => StoreProviderV4({children: it, ...StoreSpecV4}))
        .to(it => StoreProviderV3({children: it, ...StoreSpecV3}))
    .end()
}

export function App(props: AppProps) {
    useStoreStorage()
    useColorSchemePreference()

    return <>
        <SwitchRoute fallback={<NotFoundView/>}>
            <CaseRoute is={Routes.RootRoute.pattern}>
                <HomeView/>
            </CaseRoute>
            <CaseRoute is={Routes.ShowcaseRoute.pattern}>
                <div>
                    <Header/>
                    <Showcase>{ShowcaseIndex}</Showcase>
                </div>
            </CaseRoute>
            <CaseRoute is={exact('/arg/' + Arg)} children={id =>
                <div>
                    <Header/>
                    <h1>Route ID {id}</h1>
                </div>
            }/>
            <CaseRoute is={Routes.AdminRoute.pattern}>
                <AuthBarrier>
                    <AdminView/>
                </AuthBarrier>
            </CaseRoute>
            <CaseRoute is={Routes.AuthRoute.pattern}>
                <AuthView/>
            </CaseRoute>
        </SwitchRoute>

        <Portal/>
    </>
}

// Types ///////////////////////////////////////////////////////////////////////

export interface RootProps {
    children: React.ReactNode
    container: Container
}

export interface AppProps {
}
