import { createEvent, createStore } from 'effector'

const redirected = createEvent<string>()
const clear = createEvent()

const $from = createStore<string | null>(null)
    .on(redirected, (_, from) => from)
    .reset(clear)

export const routingModel = {
    stores: { from: $from },
    events: { redirected, clear },
}
