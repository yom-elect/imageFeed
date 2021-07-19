export const settings = {
    state: true,
    reducers: {
        updateConnection(_state, payload){
            return payload
        }
    },
    effects: dispatch =>({
        updateNetInfo(payload, _rootState) {
            dispatch.settings.updateConnection(payload)
        }
    })
}