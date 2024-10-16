import { rest } from 'msw'

export const handlers = [
    rest.get('/api/documents', (req, res, ctx) => {
        const storedData = JSON.parse(localStorage.getItem('documents') ?? '[]')
        return res(ctx.status(200), ctx.json(storedData))
    }),

    /**
     * I had to deprecate the version of MSW as latest version has some issue configuring in TS but in the same i have used 
     *  other dependencies with node@20 so unable to parse the body. So this request is not actually implemented it's just a prototype.
     */
    rest.post('/api/documents', (req:any, res, ctx) => {
        const data = req.body
        const storedData = JSON.parse(localStorage.getItem('documents') ?? '[]')
        localStorage.setItem('documents', JSON.stringify(storedData))
        return res(
            ctx.status(200),
            ctx.json(storedData)
        )
    })
]