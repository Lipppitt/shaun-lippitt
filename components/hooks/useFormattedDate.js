import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const useFormattedDate = (dateString) => {
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect(() => {
        let date = new Date(dateString);

        if (!isNaN(date.getTime())) {
            setFormattedDate(format(date, 'MMM dd, yyyy'));
        }
    }, [dateString]);

    return formattedDate;
};

export default useFormattedDate;
