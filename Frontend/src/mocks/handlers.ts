import { rest } from 'msw'

export const handlers = [
    rest.get('/api/documents', (req, res, ctx) => {
        const storedData = JSON.parse(localStorage.getItem('documents') ?? '[]')
        return res(ctx.status(200), ctx.json(storedData))
    }),

    rest.post('/api/documents', (req, res, ctx) => {
        const newDocument = req.body
        const storedData = JSON.parse(localStorage.getItem('documents') ?? '{}')
        storedData.push(newDocument)
        localStorage.setItem('documents', JSON.stringify(storedData))
        return res(
            ctx.status(200),
            ctx.json(storedData)
        )
    })
]