const initialState = {
    assets: [
        { id: 1, name: 'SmartRepo', encode: 'smrt1', entype: 'app' },
        { id: 2, name: 'Smart Repo', encode: 'smrt2', entype: 'app' }
    ],
    nextId: 3
}

const assetReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT_NEXTID':
            return {
                ...state,
                nextId: action.payload + 1
            }
        case 'Delete_Asset':
            return {
                ...state,
                assets: state.assets.filter(asset => {
                    return action.payload !== asset.id
                })
            }
        case 'Add_Asset':
            return {
                ...state,
                assets: [...state.assets, action.payload]
            }
        case 'Edit_Asset':
            // console.log(action.payload)
            state.assets.map(asset => {
                if (action.payload.id == asset.id) {
                    // console.log("reached here")
                    asset.name = action.payload.name
                    asset.encode = action.payload.encode
                    asset.entype = action.payload.entype
                }
                return state
            })
            return {
                ...state,
                assets: [...state.assets]

            }
        default: return state
    }

}

export default assetReducer