import {Fetch, FetchRequestOptions} from '@eviljs/std-web/fetch'
import {mockFetchDelayed, jsonResponse} from '@eviljs/std-web/fetch-mock'
import {randomInt, randomItem} from '@eviljs/std-lib/random'
// import {indexBy, indexById, times} from '@eviljs/std-lib/fn'

export function mockFetch(fetch: Fetch) {
    return mockFetchDelayed(fetch, FetchMocks, {minDelay: 500, maxDelay: 1000})
}

export const FetchMocks = {
    'get': [
        ['^/auth$', (options?: FetchRequestOptions) =>
            new Response(null, {status: 204}) // 204 | 401
        ] as const,
        ['^/account/\\w+$', (options?: FetchRequestOptions) =>
            jsonResponse({
                id: '123',
                firstName: 'Peter',
                lastName: 'Pan',
                avatar: 'https://www.tekoway.com/wp-content/uploads/2018/12/John-Doe.jpg',
            })
        ] as const,
    ],
    'post': [
        ['^/auth$', (options?: FetchRequestOptions) => {
            const body = JSON.parse(options?.body as string)
            if (body.identifier !== 'demo' || body.secret !== 'demo') {
                return new Response(null, {status: 404})
            }
            return jsonResponse({token: 'abc1234567890'})
        }] as const,
    ],
}

// export function createExampleData(): ExampleDataResponse {
//     return {
//         data: times(200).map(idx => ({
//             id: `id-${idx+1}`,
//             name: `${idx+1}`,
//             value: randomInt(100, 1000),
//         })),
//     }
// }
