import { getFrequencies } from '../services/api';
import { showErrorToast } from '../utils/toastUtil';
import { Frequency } from '../interfaces/Frequency';

export const loadFrequencies = async () => {
    try {
        const frequenciesList: Frequency[] = await getFrequencies();

        return frequenciesList;
    } catch (error) {
        showErrorToast('Failed to load frequencies');
        console.error(error)
        return [];
    }
};