import { notify } from 'react-notify-toast';
import { errorColour } from 'services/notification/colours';

export const useLtsWarning = (): void => {
    notify.show('Submitting data has been disabled for long-term maintenance reasons', 'error', 5000, errorColour);
};
