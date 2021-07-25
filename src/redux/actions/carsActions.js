import { CarService } from "../../api/CarService";

export const getCars = (offset) => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING_CARS' });
        const limit = 5;
        const params = {limit,offset};
        await CarService.getCars(params)
            .then((response) => {

                if (response && 'status' in response && response.status && response.message) {
                    var dispatched = { 
                        type: (typeof response.message === 'string') ? 'CARS_LIST_FAILED' : 'CARS_LIST_SUCCESS', 
                    };
                    dispatched[(typeof response.message === 'string') ? 'error' : 'cars'] = response.message;
                    console.log('login response: ', dispatched);

                    dispatch(dispatched);
                    return;
                }
                dispatch({ type: 'CARS_LIST_FAILED', error: response.message });
            })
            .catch((_error) => {
                dispatch({
                    type: 'CARS_LIST_FAILED',
                    cars: null,
                    error: 'Erreur inconu',
                });
            });;
    };
};