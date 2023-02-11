import { Redis } from '@upstash/redis/cloudflare'

const redis = new Redis({
	url:'https://us1-proven-molly-39625.upstash.io',
	toke:'teste'
})

export interface Env {

}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const { pathname } = new URL(request.url)

		switch (pathname){
			case '/write': {
				const count = await redis.incr('count')
				return new Response(JSON.stringify({ count }),{
					headers: {
						'Content-type': 'application/json'
					}
				})
			}
			case '/read':{
				const count = await redis.get('count')
				return new Response(JSON.stringify({ count }),{
					headers: {
						'Content-type': 'application/json'
					}
				})
			}
			default: {
				return new Response(null, {status: 404})
			}
		}
	},
};
