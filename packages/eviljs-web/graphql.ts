import {ContentType} from '@eviljs/web/fetch'

export function asGraphqlOptions(query: string, variables?: undefined | {}): RequestInit {
    return {
        method: 'POST',
        headers: {
            'Content-Type': ContentType.Json,
            'Accept': ContentType.Json,
        },
        body: JSON.stringify({query, variables}),
    }
}
