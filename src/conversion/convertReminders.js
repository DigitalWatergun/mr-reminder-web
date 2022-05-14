const convertRemindersToLocal = (reminders) => {
    for (const reminder of reminders) {
        if (reminder.dateEnable && reminder.timeEnable) {
            const year = reminder.utcDateTime.split("-")[0];
            const utcDateTime = new Date(
                Date.UTC(
                    year,
                    reminder.month,
                    reminder.day,
                    reminder.hour,
                    reminder.minutes
                )
            );
            let localMonth = utcDateTime.getMonth().toString();
            let localDay = utcDateTime.getDate().toString();
            let localHour = utcDateTime.getHours().toString();
            let localMinutes = utcDateTime.getMinutes().toString();

            if (localMonth.length === 1) {
                localMonth = "0" + localMonth;
            }

            if (localDay.length === 1) {
                localDay = "0" + localDay;
            }

            if (localHour.length === 1) {
                localHour = "0" + localHour;
            }

            if (localMinutes.length === 1) {
                localMinutes = "0" + localMinutes;
            }

            reminder["date"] = `${year}-${localMonth}-${localDay}`;
            reminder["month"] = localMonth;
            reminder["day"] = localDay;
            reminder["time"] = `${localHour}:${localMinutes}`;
            reminder["hour"] = localHour;
            reminder["minutes"] = localMinutes;
        }
    }

    return reminders;
};

const convertRemindersToUTC = (formData) => {
    const combinedDateTime = formData.date + "T" + formData.time;
    const dateObject = new Date(combinedDateTime);
    const utcYear = dateObject.getUTCFullYear().toString();
    let utcMonth = (dateObject.getUTCMonth() + 1).toString();
    let utcDay = dateObject.getUTCDate().toString();
    let utcHours = dateObject.getUTCHours().toString();
    let utcMin = dateObject.getUTCMinutes().toString();

    if (utcMonth.length === 1) {
        utcMonth = "0" + utcMonth;
    }

    if (utcDay.length === 1) {
        utcDay = "0" + utcDay;
    }

    if (utcHours.length === 1) {
        utcHours = "0" + utcHours;
    }

    if (utcMin.length === 1) {
        utcMin = "0" + utcMin;
    }

    const utcDateTime = `${utcYear}-${utcMonth}-${utcDay}T${utcHours}:${utcMin}`;
    formData["utcDateTime"] = utcDateTime;
    formData["date"] = `${utcYear}-${utcMonth}-${utcDay}`;
    formData["time"] = `${utcHours}:${utcMin}`;

    return formData;
};

export { convertRemindersToLocal, convertRemindersToUTC };
